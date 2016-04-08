"use strict";

module.exports = function(sequelize, DataTypes) {

  var Status = sequelize.define("Status",
  {
    name:         DataTypes.STRING,
    closed:       DataTypes.BOOLEAN,
    color:        DataTypes.STRING,
    sortIndex:    DataTypes.INTEGER
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {

        Status.belongsTo(models.Category);

      }
    }
  });

  return Status;
};