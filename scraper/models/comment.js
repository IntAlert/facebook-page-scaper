'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    fb_id: DataTypes.STRING,
    fb_message: DataTypes.TEXT,
    comments_last_scraped: DataTypes.DATE,
    fb_created_time: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Comment;
};