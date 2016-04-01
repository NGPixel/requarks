"use strict";

module.exports = function(sequelize, DataTypes) {

  var Property = sequelize.define("Property",
  {
    value:        DataTypes.STRING
  },
  {
    timestamps: true,
    classMethods: {
      associate: function(models) {

        Property.belongsTo(models.Request);
        Property.belongsTo(models.PropertyDefinition);

      }
    }
  });

  return Property;
};