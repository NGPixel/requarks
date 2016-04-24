"use strict";

module.exports = function(sequelize, DataTypes) {

  var Team = sequelize.define("Team",
  {
    name:         DataTypes.STRING,
    description:  DataTypes.STRING,
    slug:         DataTypes.STRING,
    memberCount:  DataTypes.INTEGER
  },
  {
    timestamps: true,
    classMethods: {
      associate(models) {
        Team.belongsToMany(models.User, {through: models.TeamUsers});
        Team.belongsToMany(models.Project, {through: 'TeamProjects'});
      },
      countFromUserId(usrid) {
        return this.count({
          include: [{ model: db.User, where: { id: usrid } }]
        });
      }
    }
  });

  return Team;
};