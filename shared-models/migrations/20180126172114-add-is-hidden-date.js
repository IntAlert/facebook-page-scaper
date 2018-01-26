'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Posts', 'is_hidden_detected', {
      type: Sequelize.DATE
    })
    queryInterface.addColumn('Comments', 'is_hidden_detected', {
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
