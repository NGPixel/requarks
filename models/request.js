"use strict";

module.exports = function(sequelize, DataTypes) {

  var Request = sequelize.define("Request",
  {
    title:        DataTypes.STRING
  },
  {
    paranoid: true,
    timestamps: true,
    classMethods: {
      associate: function(models) {

        Request.belongsToMany(models.Sprint, {through: 'SprintRequests'});
        Request.belongsToMany(models.User, { as: 'stakeholders', through: 'Stakeholders'});

        Request.hasMany(models.Activity);
        Request.hasMany(models.Comment);
        Request.hasMany(models.Description);
        Request.hasMany(models.Document);
        Request.hasMany(models.Property);

        Request.belongsTo(models.Status);
        Request.belongsTo(models.Priority);
        Request.belongsTo(models.Type);
        Request.belongsTo(models.Category);
        Request.belongsTo(models.User, { as: 'author' });
        Request.belongsTo(models.User, { as: 'assignedUser' });
        Request.belongsTo(models.Team, { as: 'assignedTeam' });

      }
    }
  });

  return Request;
};