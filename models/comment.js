"use strict";

module.exports = function(sequelize, DataTypes) {

  var Comment = sequelize.define("Comment",
  {
    content:        DataTypes.TEXT
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {

        Comment.belongsTo(models.Request);
        Comment.belongsTo(models.User, { as: 'author' });

      }
    }
  });

  return Comment;
};