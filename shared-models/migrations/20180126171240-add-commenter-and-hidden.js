'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // Comment user
    queryInterface.addColumn('Comments', 'fb_user_fullname', {
      type: Sequelize.STRING,
      defaultValue:false
    })

    queryInterface.addColumn('Comments', 'fb_user_id', {
      type: Sequelize.STRING,
      defaultValue:false
    })

    // Post user
    queryInterface.addColumn('Posts', 'fb_user_fullname', {
      type: Sequelize.STRING,
      defaultValue:false
    })

    queryInterface.addColumn('Posts', 'fb_user_id', {
      type: Sequelize.STRING,
      defaultValue:false
    })

    // Is hidden
    queryInterface.addColumn('Comments', 'is_hidden', {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    })
    queryInterface.addColumn('Posts', 'is_hidden', {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    })

    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
