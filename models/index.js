"use strict";

var _         = require('lodash');
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

module.exports = function(config) {

  // Init DB connector

  var sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
                    dialect: config.db.engine,
                    host: config.db.host,
                    logging: console.log,
                    dialectOptions: {
                      encrypt: _.endsWith(config.db.host, 'database.windows.net') ? true : false
                    }
                  });
  var db = {};

  // Load Models

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js") && (_.endsWith(file, '.js'));
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  // Create associations

  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;

}