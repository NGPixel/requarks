"use strict";

module.exports = function(sequelize, DataTypes) {

  var Project = sequelize.define("Project",
  {
    name:         DataTypes.STRING,
    slug:         DataTypes.STRING,
    description:  DataTypes.STRING,
    isActive:     DataTypes.BOOLEAN
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {
        Project.belongsToMany(models.Team, {through: 'TeamProjects'});
        Project.belongsTo(models.User, { as: 'owner' });
      }
    }
  });

  return Project;
};