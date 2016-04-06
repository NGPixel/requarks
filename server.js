"use strict";

// ===========================================
// REQUARKS
// 1.0.0
// Licensed under GPLv3
// ===========================================

var fork = require('child_process').fork,
      fs = require('fs'),
      path = require('path');

var program = require('commander'),
    setupMode = false,
    srv = null,
    reloadRequested = false;

// -----------------------------------------------
// Define commands / arguments
// -----------------------------------------------

program
  .option('-p, --port <n>', 'Port Requarks will run on', parseInt)
  .option('-s, --setup', 'Forces Requarks to run in setup mode')
  .parse(process.argv);

if(program.help === true) {
  return;
}

// -----------------------------------------------
// Init Checks
// -----------------------------------------------

console.log('Initializing Requarks...');

//-> Verify config.json

try {
  fs.accessSync('./config.json', fs.R_OK | fs.W_OK);
  let configRaw = fs.readFileSync('./config.json', 'utf8');
  let config = JSON.parse(configRaw);
  if(config.setup !== true) {
    throw new Error('Setup was not previously completed.');
  }
} catch(err) {
  setupMode = true;
  console.log('Missing or invalid config file. Starting in setup mode...')
}

//-> Force setup mode?

if(program.setup === true) {
  setupMode = true;
}

// -----------------------------------------------
// Run server
// -----------------------------------------------

let srvPath = path.join(__dirname, './bin/www');
let srvPort = (program.port) ? program.port : 80;

function startServer() {
  let srvMode = (setupMode) ? 'setup' : 'app';
  return fork(srvPath, [srvPort, srvMode], {
    cwd: __dirname
  });
}

srv = startServer();

// -----------------------------------------------
// Reload server after setup
// -----------------------------------------------

srv.on('message', (m) => {
  if(m === 'reload') {
    console.log('Killing setup process...');
    setupMode = false;
    reloadRequested = true;
    srv.kill();
  }
});

srv.on('exit', (code) => {
  if(reloadRequested) {
    console.log('Reloading...');
    srv = startServer();
  }
});

// -----------------------------------------------
// Kill child process before quitting
// -----------------------------------------------

process.on('exit', function() {
  if(srv) {
    srv.kill();
  }
});