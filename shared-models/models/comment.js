'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    fb_id: DataTypes.STRING,
    
    parent_post_fb_id: DataTypes.STRING,
    parent_post_id: DataTypes.INTEGER,
    
    parent_comment_fb_id: DataTypes.STRING,
    parent_comment_id: DataTypes.INTEGER,
    parent_page_id: DataTypes.INTEGER,
    
    fb_message: DataTypes.TEXT,
    fb_created_time: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN,

    fb_reactions_total_count: DataTypes.INTEGER,
    fb_reactions_summary_type: DataTypes.STRING,

    comments_last_scraped: DataTypes.DATE,
    reactions_last_scraped: DataTypes.DATE,
    deletion_status_last_scraped: DataTypes.DATE,
    deletion_detected: DataTypes.DATE,

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  // Associations
  Comment.associate = function (models) {
    Comment.belongsTo(models.Page, {foreignKey: 'parent_page_id', targetKey: 'id'});
  };
  
  return Comment;
};