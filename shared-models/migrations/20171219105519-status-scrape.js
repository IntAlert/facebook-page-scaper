'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    
    return [
      queryInterface.addColumn('Comments', 'reactions_last_scraped', {
          type: Sequelize.DATE
      }),
    ];

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
