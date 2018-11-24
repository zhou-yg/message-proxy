#!/usr/bin/env node

let argv = process.argv

let port = +argv[2]
let name = +argv[3]

process.env.PORT = port;
process.env.NAME = name;

require('./lib/server');
