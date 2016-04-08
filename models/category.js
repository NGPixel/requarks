"use strict";

module.exports = function(sequelize, DataTypes) {

  var Category = sequelize.define("Category",
  {
    name:         DataTypes.STRING,
    shortName:    DataTypes.STRING,
    description:  DataTypes.STRING,
    color:        DataTypes.STRING,
    icon:         DataTypes.STRING
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {

        Category.belongsTo(models.Priority, { as: 'defaultPriority', constraints: false });
        Category.belongsTo(models.Status, { as: 'defaultStatus', constraints: false });
        Category.belongsTo(models.Type, { as: 'defaultType', constraints: false });

      }
    }
  });

  return Category;
};