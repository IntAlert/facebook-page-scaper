'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Posts', 'deletion_detected', {
      type: Sequelize.DATE
    })
    queryInterface.addColumn('Comments', 'deletion_detected', {
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
