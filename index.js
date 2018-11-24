#!/usr/bin/env node

let argv = process.argv

let port = +argv[2]
let name = +argv[3]

if (port) {
  process.env.PORT = port;
}
if (name) {
  process.env.NAME = name;  
}

require('./lib/server');
