"use strict";

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User",
  {
    username:   DataTypes.STRING,
    firstName:  DataTypes.STRING,
    lastName:   DataTypes.STRING,
    email:      DataTypes.STRING,
    jobTitle:   DataTypes.STRING
  },
  {
    timestamps: true,
    getterMethods: {
      fullName: function() { return this.firstName + ' ' + this.lastName; }
    },
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Team, {through: 'TeamUsers'});
        User.belongsToMany(models.Request, { as: 'relatedRequests', through: 'Stakeholders'});
      }
    }
  });

  return User;
};