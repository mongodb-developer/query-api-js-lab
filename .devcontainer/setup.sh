#!/bin/bash

echo ✅ APT GET UPDATE
echo ✅ --------------
apt-get update -y

#  apt-get install python3.8

echo ✅ Install Jupyter notebook
echo ✅ ------------------------
# Install Jupyter notebook
apt-get install jupyter -y
apt-get clean packages

echo ✅ Install Jupyter Python kernel
echo ✅ -----------------------------
# Python Kernel
apt-get install python3-pymongo -y
apt-get clean packages

echo ✅ Install Deno
echo ✅ ------------
# Install deno - Nodejs modern engine
apt-get install npm -y
npm install -g deno
export PATH="$PATH:/home/vscode/lib/node_modules/deno"
apt-get clean packages

echo ✅ Install Deno Jupyter Kernel
echo ✅ ---------------------------
deno jupyter --install

echo ✅ Install MongoDB Deno Driver
echo ✅ ---------------------------
# Install MongoDB Deno driver
deno install --global --allow-net --allow-read https://deno.land/x/mongo@v0.31.1/mod.ts

echo ✅ Install cURL
echo ✅ ----------------
apt-get install curl -y
apt-get clean packages

echo ✅ Install Node.js v23 
echo ✅ ----------------
# Install Node.js 23 as MongoDB MCP server needs at least v20 (https://github.com/mongodb-js/mongodb-mcp-server?tab=readme-ov-file#prerequisites)
npm install -g n
n 23
hash -r 
