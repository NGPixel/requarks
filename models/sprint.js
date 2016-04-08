"use strict";

module.exports = function(sequelize, DataTypes) {

  var Sprint = sequelize.define("Sprint",
  {
    iteration:    DataTypes.INTEGER,
    name:         DataTypes.STRING,
    startsOn:     DataTypes.DATEONLY,
    endsOn:       DataTypes.DATEONLY
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {
        Sprint.belongsToMany(models.Request, {through: 'SprintRequests'});
        Sprint.belongsTo(models.Project);
      }
    }
  });

  return Sprint;
};