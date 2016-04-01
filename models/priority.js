"use strict";

module.exports = function(sequelize, DataTypes) {

  var Priority = sequelize.define("Priority",
  {
    name:       DataTypes.STRING,
    color:      DataTypes.STRING,
    sortIndex:  DataTypes.INTEGER
  },
  {
    timestamps: true,
    classMethods: {
      associate: function(models) {

        Priority.belongsTo(models.Category);

      }
    }
  });

  return Priority;
};