'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Posts', 'deletion_status_last_scraped', {
      type: Sequelize.DATE
    })
    queryInterface.addColumn('Comments', 'deletion_status_last_scraped', {
      type: Sequelize.DATE
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
