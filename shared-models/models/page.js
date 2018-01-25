'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    fb_id: DataTypes.STRING,
    access_token: DataTypes.STRING,
    last_scraped: DataTypes.DATE,
    disabled: DataTypes.BOOLEAN,
  }
  // // , {
  // //   classMethods: {
  // //     associate: function(models) {
  // //       // associations can be defined here
  // //       // models.Page.hasMany(models.Post, {foreignKey: 'page_id', sourceKey: 'id'});
  // //     }
  //   }
  // }
);

  // Associations
  Page.associate = function (models) {
    models.Page.hasMany(models.Post, {foreignKey: 'parent_page_id', sourceKey: 'id'});
  };
  return Page;
};