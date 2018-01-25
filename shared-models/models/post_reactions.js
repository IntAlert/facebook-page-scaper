'use strict';
module.exports = (sequelize, DataTypes) => {
  var post_reactions = sequelize.define('post_reactions', {
    post_id: DataTypes.INTEGER,
    fb_user_id: DataTypes.STRING,
    fb_user_fullname: DataTypes.STRING,
    fb_reaction_type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return post_reactions;
};