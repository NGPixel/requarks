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
  return fork(srvPath, null, {
    cwd: __dirname,
    env: {
      APPMODE: (setupMode) ? 'setup' : 'app',
      PORT: srvPort
    }
  });
}

srv = startServer();

srv.on('message', (m) => {
  if(m === 'reload') {
    console.log('Reloading...');
    setupMode = false;
    reloadRequested = true;
    srv.kill();
  }
});

srv.on('exit', (code) => {
  if(reloadRequested) {
    srv = startServer();
  } else {
    console.log('Requarks has exited.');
  }
});