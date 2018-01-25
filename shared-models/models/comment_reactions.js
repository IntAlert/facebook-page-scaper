'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment_reactions = sequelize.define('comment_reactions', {
    comment_id: DataTypes.INTEGER,
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
  return comment_reactions;
};