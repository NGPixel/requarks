"use strict";

module.exports = function(sequelize, DataTypes) {

  var Team = sequelize.define("Team",
  {
    name:       DataTypes.STRING
  },
  {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Team.belongsToMany(models.User, {through: 'TeamUsers'});
        Team.belongsToMany(models.Project, {through: 'TeamProjects'});
      }
    }
  });

  return Team;
};