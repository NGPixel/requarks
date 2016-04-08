"use strict";

module.exports = function(sequelize, DataTypes) {

  var Type = sequelize.define("Type",
  {
    name:         DataTypes.STRING,
    description:  DataTypes.STRING,
    color:        DataTypes.STRING,
    sortIndex:    DataTypes.INTEGER
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {

        Type.belongsTo(models.Category);

      }
    }
  });

  return Type;
};