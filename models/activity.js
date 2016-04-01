"use strict";

module.exports = function(sequelize, DataTypes) {

  var Activity = sequelize.define("Activity",
  {
    summary:        DataTypes.STRING,
    oldValue:       DataTypes.TEXT,
    newValue:       DataTypes.TEXT,
  },
  {
    timestamps: true,
    classMethods: {
      associate: function(models) {

        Activity.belongsTo(models.Request);
        Activity.belongsTo(models.User, { as: 'author' });

      }
    }
  });

  return Activity;
};