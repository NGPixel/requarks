// ===========================================
// REQUARKS
// 1.0.0
// Licensed under GPLv3
// ===========================================

var path      = require("path");
var Sequelize = require("sequelize");
var config    = require(path.join(__dirname, 'config.json'));

var sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  dialect: 'mssql',
  logging: console.log,
  dialectOptions: {
    encrypt: true
  }
});

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
});

sequelize.authenticate()
.then(function() {
 console.log('Connection has been established successfully.');
})
.catch(function(e){
 console.log('Unable to connect to the database:', e);
});

User.sync({force: true})
  .then(function () {
    console.log('TEST');
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  })
 .catch(console.log);