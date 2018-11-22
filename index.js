#!/usr/bin/env node

let argv = process.argv

let port = +argv[2]
let host = +argv[3]
let name = +argv[4]

process.env.PORT = port;
process.env.HOST = host;
process.env.NAME = name;

require('./lib/server');
