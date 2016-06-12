"use strict";

module.exports = function(sequelize, DataTypes) {

  var Type = sequelize.define("Type",
  {
    name:         DataTypes.STRING,
    slug:         DataTypes.STRING,
    description:  DataTypes.STRING,
    color:        DataTypes.STRING,
    icon:         DataTypes.STRING,
    system:       DataTypes.BOOLEAN
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {

        Type.belongsTo(models.Type, { as: 'parent' });

      }
    }
  });

  return Type;
};