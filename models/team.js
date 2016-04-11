"use strict";

module.exports = function(sequelize, DataTypes) {

  var Team = sequelize.define("Team",
  {
    name:         DataTypes.STRING,
    description:  DataTypes.STRING,
    slug:         DataTypes.STRING
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {
        Team.belongsToMany(models.User, {through: 'TeamUsers'});
        Team.belongsToMany(models.Project, {through: 'TeamProjects'});
      }
    }
  });

  return Team;
};