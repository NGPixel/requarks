"use strict";

module.exports = function(sequelize, DataTypes) {

  var Description = sequelize.define("Description",
  {
    content:        DataTypes.TEXT
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {

        Description.belongsTo(models.Request);
        Description.belongsTo(models.User, { as: 'author' });

      }
    }
  });

  return Description;
};