#!/usr/bin/env node

var argv = process.argv

var port = +argv[2]
var name = +argv[3]

if (port) {
  process.env.PORT = port;
}
if (name) {
  process.env.NAME = name;
}

require('./lib/server');
