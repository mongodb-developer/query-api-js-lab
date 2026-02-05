[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mongodb-developer/query-api-js-lab)


# MongoDB Query API JavaScript Lab

This is a __set of coding examples that will help you learn how to use MongoDB__. We use Jupyter Notebooks because of their interactivity and inmediate feedback. This, along with the ability to include instructions mixed with code facilitates our approach of learning by doing and testing new concepts. 

If you've never used Jupyter Notebooks, [here is a one-page quick start](https://mongodb-developer.github.io/vector-search-lab/docs/dev-env/jupyter-notebooks).

We use this lab during our Developer Days Labs, to speed up the time from theory to code. We also use it in webinars, MongoDB .Local Labs / demos and during customer meetings or Design Reviews.

## How to use this lab

### Running in a GitHub Codespace

- Log in to your Github Account. This is needed to start a new Codespace.
    - If you log in with your enterprise / organization account maybe they have restricted the use of Codespaces. In that case use your personal Github account.
- Click this button 

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mongodb-developer/query-api-js-lab)
- This will create a couple Docker containers, open Visual Studio Code in the browser and clone the repo.
- Wait for the Codespace to finish loading. You know everything has finished when you see the MongoDB Visual Studio Code extension loaded at the left (looks like a leaf)
- Navigate to the examples you want to run and click on the run icon. You'll be asked to choose a kernel. Pick Java for the Java examples, Deno for Javascript, DotNet for the C# code and Python for, well, Python code.

### Running locally

- Install [Docker](https://docs.docker.com/get-started/introduction/get-docker-desktop/) in your system
- Clone the repo: `git clone https://github.com/mongodb-developer/query-api-js-lab`
- Install [Visual Studio Code](https://code.visualstudio.com/)
- Open the repo from VSC, open the [Command Palette](https://code.visualstudio.com/api/ux-guidelines/command-palette), select `Dev Containers: Rebuild and reopen in Container`
- The lab will start two containers (see section below) 

## Available code examples

We aim to have the same set of examples for each supported language. Right now you have available:

- [Java](https://github.com/mongodb-developer/query-api-java-lab)
- [Python](https://github.com/mongodb-developer/query-api-python-lab/)
- [Javascript](https://github.com/mongodb-developer/query-api-js-lab)
- [C#](https://github.com/mongodb-developer/query-api-dotnet-lab)

## Database

The Library database in included, along with a pre-defined connection inside the MongoDB Visual Studio Code extension. Just open the extension and click on the connection to browse the Library database.

There are two versions of this database. One includes vector embeddings for the books, in case you want to try Atlas Vector Search.

If you need to restore the original data, open a Terminal in Visual Studio code and type:

```shell
.devcontainer/import.sh 
```

## open ports

- 3000: Jupyter notebooks
- 27017: MongoDB Atlas local instance 

## Containers

If you clone this repo and run it locally (using VS Code) or start a new Codespace, you'll start two containers:

- an Atlas Local Cluster, that has a MongoDB database server with the Library dataset imported (see `.devcontainer/import.sh`). 
- a Linux Ubuntu container with some development tools:
    - Python (installed through `.devcontainer/setup.sh`)
    - Deno (installed through `.devcontainer/setup.sh`)
    - Jupyter notebook server (installed through `.devcontainer/setup.sh`)
    - The MongoDB database tools (installed through `.devcontainer/install-mongodb-db-tools.sh`)
