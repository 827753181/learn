var fs = require("fs"),
  nconf = require("nconf"),
  path = require("path");

nconf.argv().env();
nconf.file("file", { file: path.resolve(__dirname, "./config.json") });

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
//
// Set a few variables on `nconf`.
//
nconf.set("database:host", "127.0.0.1");
nconf.set("database:port", 5984);


//
// Get the entire database object from nconf. This will output
// { host: '127.0.0.1', port: 5984 }
//
console.log("foo: " + nconf.get("foo"));
console.log("NODE_ENV: " + nconf.get("NODE_ENV"));
console.log("database: " + nconf.get("database"));
console.log("if nothing else: " + nconf.get("if nothing else"));

//
// Save the configuration object to disk
//
nconf.save(function (err) {
  console.log(err);
});
