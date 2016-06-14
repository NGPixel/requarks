"use strict";

module.exports = function(sequelize, DataTypes) {

  var TeamUsers = sequelize.define("TeamUsers",
  {
    level: DataTypes.STRING
  });

  return TeamUsers;
};