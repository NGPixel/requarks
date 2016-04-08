"use strict";

module.exports = function(sequelize, DataTypes) {

  var Document = sequelize.define("Document",
  {
    name:       DataTypes.STRING,
    sizeInKB:   DataTypes.BIGINT,
    baseType:   DataTypes.STRING,
    folder:     DataTypes.STRING,
    ownerType:  DataTypes.ENUM('request', 'project')
  },
  {
    paranoid: true,
    timestamps: true,
    classMethods: {
      associate(models) {

        Document.belongsTo(models.Request);
        Document.belongsTo(models.Project);
        Document.belongsTo(models.User, { as: 'author' });

      }
    }
  });

  return Document;
};