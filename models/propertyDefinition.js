"use strict";

module.exports = function(sequelize, DataTypes) {

  var PropertyDefinition = sequelize.define("PropertyDefinition",
  {
    name:         DataTypes.STRING,
    format:       DataTypes.ENUM('text','int','choice'),
    prefix:       DataTypes.STRING,
    suffix:       DataTypes.STRING,
    sortIndex:    DataTypes.INTEGER,
    value:        DataTypes.TEXT,
    defaultValue: DataTypes.STRING,
    placeholder:  DataTypes.STRING,
    description:  DataTypes.STRING,
    icon:         DataTypes.STRING,
    validation:   DataTypes.STRING,
    isRestricted: DataTypes.BOOLEAN
  },
  {
    paranoid: true,
    timestamps: true,
    classMethods: {
      associate(models) {

        PropertyDefinition.belongsTo(models.Category);
        PropertyDefinition.belongsTo(models.Type);

      }
    }
  });

  return PropertyDefinition;
};