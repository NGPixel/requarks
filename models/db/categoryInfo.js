"use strict";

module.exports = function(sequelize, DataTypes) {

  var CategoryInfo = sequelize.define("CategoryInfo",
  {
    name:         DataTypes.STRING,
    position:     DataTypes.STRING,
    content:      DataTypes.TEXT,
    icon:         DataTypes.STRING
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {

        CategoryInfo.belongsTo(models.Category);

      }
    }
  });

  return CategoryInfo;
};