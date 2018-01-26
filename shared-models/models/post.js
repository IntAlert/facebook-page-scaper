'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    fb_id: DataTypes.STRING,
    parent_page_id: DataTypes.INTEGER,
    fb_created_time: DataTypes.DATE,
    fb_message: DataTypes.TEXT,
    fb_story: DataTypes.TEXT,
    
    comments_last_scraped: DataTypes.DATE,
    reactions_last_scraped: DataTypes.DATE,
    
    is_hidden: DataTypes.BOOLEAN,
    is_hidden_detected: DataTypes.DATE,

    deleted: DataTypes.BOOLEAN,
    visibility_last_scraped: DataTypes.DATE,
    deletion_detected: DataTypes.DATE,
    
    fb_user_fullname: DataTypes.STRING,
    fb_user_id: DataTypes.STRING,

    fb_reactions_total_count: DataTypes.INTEGER,
    fb_reactions_summary_type: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  // Associations
  Post.associate = function (models) {

    // Post belongs to Page
    Post.belongsTo(models.Page, {foreignKey: 'parent_page_id', targetKey: 'id'});

    // Post has comments
    Post.hasMany(models.Comment, {foreignKey: 'parent_post_id', sourceKey: 'id'});

    // Post has reactions
    Post.hasMany(models.post_reactions, {foreignKey: 'post_id', sourceKey: 'id'});
  };

  return Post;
};