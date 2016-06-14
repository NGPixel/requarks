"use strict";

module.exports = function(sequelize, DataTypes) {

  var SubCategory = sequelize.define("SubCategory",
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

        SubCategory.belongsTo(models.Category);

      }
    }
  });

  return SubCategory;
};