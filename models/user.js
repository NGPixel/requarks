"use strict";

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User",
  {
    username:   DataTypes.STRING,
    firstName:  DataTypes.STRING,
    lastName:   DataTypes.STRING,
    email:      DataTypes.STRING,
    jobTitle:   DataTypes.STRING,
    locale:     DataTypes.STRING,
    timezone:   DataTypes.STRING,
    isActive:   DataTypes.BOOLEAN
  },
  {
    timestamps: true,
    getterMethods: {
      fullName() { return this.firstName + ' ' + this.lastName; }
    },
    classMethods: {
      associate(models) {
        User.belongsToMany(models.Team, {through: models.TeamUsers});
        User.belongsToMany(models.Request, { as: 'relatedRequests', through: 'Stakeholders'});
      }
    }
  });

  return User;
};