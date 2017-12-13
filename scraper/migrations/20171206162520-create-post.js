'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fb_id: {
        type: Sequelize.STRING
      },
      fb_created_time: {
        type: Sequelize.DATE
      },
      fb_message: {
        type: Sequelize.TEXT
      },
      fb_story: {
        type: Sequelize.TEXT
      },
      comments_last_scraped: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Posts');
  }
};