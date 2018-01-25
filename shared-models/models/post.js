'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    fb_id: DataTypes.STRING,
    parent_page_id: DataTypes.INTEGER,
    fb_created_time: DataTypes.DATE,
    fb_message: DataTypes.TEXT,
    fb_story: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN,
    comments_last_scraped: DataTypes.DATE,
    reactions_last_scraped: DataTypes.DATE,
    deletion_status_last_scraped: DataTypes.DATE,
    deletion_detected: DataTypes.DATE,
    

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
    Post.belongsTo(models.Page, {foreignKey: 'parent_page_id', targetKey: 'id'});
  };

  return Post;
};