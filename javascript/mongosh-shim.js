// mongosh-shim.js
//
// Gives a Node.js notebook the same syntax you use in the MongoDB Shell (mongosh):
//
//     db.books.find({ year: { $gt: 2021 } }, { title: 1, year: 1 })
//
// The Node.js driver is asynchronous, so in the notebooks we add `await` in front of the
// calls that talk to the database. That is the only difference with mongosh, where the
// calls are synchronous: remove the `await` keywords to run the same code in mongosh.

const { MongoClient, ObjectId, BSON } = require("mongodb");

const EJSON = BSON.EJSON;

// Collection methods that have a different signature in mongosh than in the Node.js driver.
const collectionOverrides = (collection) => ({
  // mongosh: find(filter, projection)  |  driver: find(filter, { projection })
  find: (filter = {}, projection) =>
    projection ? collection.find(filter, { projection }) : collection.find(filter),
  findOne: (filter = {}, projection) =>
    projection ? collection.findOne(filter, { projection }) : collection.findOne(filter),
  // mongosh: getIndexes()  |  driver: indexes()
  getIndexes: () => collection.indexes(),
  // mongosh: createSearchIndex(name, definition)  |  driver: createSearchIndex({ name, definition })
  createSearchIndex: (name, definition) => collection.createSearchIndex({ name, definition }),
});

function wrapCollection(collection) {
  const overrides = collectionOverrides(collection);
  return new Proxy(collection, {
    get(target, prop) {
      if (prop in overrides) return overrides[prop];
      const value = target[prop];
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}

function wrapDatabase(database) {
  const dbMethods = {
    getCollection: (name) => wrapCollection(database.collection(name)),
    getSiblingDB: (name) => wrapDatabase(database.client.db(name)),
    getCollectionNames: async () =>
      (await database.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name),
    runCommand: (command) => database.command(command),
    adminCommand: (command) => database.admin().command(command),
  };

  // `db.books` returns the collection called "books", exactly like in mongosh.
  return new Proxy(database, {
    get(target, prop) {
      if (prop in dbMethods) return dbMethods[prop];
      // Not a collection name: Symbols and `then` are used by JavaScript itself (e.g. `await db`).
      if (typeof prop !== "string" || prop === "then") return undefined;
      return wrapCollection(target.collection(prop));
    },
  });
}

// Same helpers mongosh provides.
const print = (...args) => console.log(...args);
const printjson = (value) => console.log(EJSON.stringify(value, undefined, 2, { relaxed: true }));

async function connect(connectionString, databaseName = "library") {
  const client = new MongoClient(connectionString);
  await client.connect();
  return { client, db: wrapDatabase(client.db(databaseName)) };
}

module.exports = { connect, print, printjson, ObjectId };
