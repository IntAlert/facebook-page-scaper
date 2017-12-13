'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    fb_id: DataTypes.STRING,
    fb_created_time: DataTypes.DATE,
    fb_message: DataTypes.TEXT,
    fb_story: DataTypes.TEXT,
    comments_last_scraped: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Post;
};