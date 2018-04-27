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

    is_hidden: DataTypes.BOOLEAN,
    is_hidden_detected: DataTypes.DATE,

    deleted: DataTypes.BOOLEAN,
    visibility_last_scraped: DataTypes.DATE,
    deletion_detected: DataTypes.DATE,

    fb_user_fullname: DataTypes.STRING,
    fb_user_id: DataTypes.STRING,

    fb_reactions_total_count: DataTypes.INTEGER,
    fb_reactions_summary_type: DataTypes.STRING,

    comments_last_scraped: DataTypes.DATE,
    reactions_last_scraped: DataTypes.DATE,

  });

  // Associations
  Comment.associate = function (models) {

    // Comment belongs to Page (useful for fetching page access token)
    Comment.belongsTo(models.Page, {foreignKey: 'parent_page_id', targetKey: 'id'});

    // Comment has subcomments
    Comment.hasMany(models.Comment, {foreignKey: 'parent_comment_id', sourceKey: 'id'});

    // Comment has reactions
    Comment.hasMany(models.comment_reactions, {foreignKey: 'comment_id', sourceKey: 'id'});

  };
  
  return Comment;
};