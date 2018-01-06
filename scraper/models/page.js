'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    fb_id: DataTypes.STRING,
    access_token: DataTypes.STRING,
    last_scraped: DataTypes.DATE,
    disabled: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Page;
};