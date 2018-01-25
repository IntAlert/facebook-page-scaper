'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Comments', 'fb_reactions_total_count', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('Comments', 'fb_reactions_summary_type', {
      type: Sequelize.STRING
    })

    queryInterface.addColumn('Posts', 'fb_reactions_total_count', {
      type: Sequelize.INTEGER
    })

    queryInterface.addColumn('Posts', 'fb_reactions_summary_type', {
      type: Sequelize.STRING
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
