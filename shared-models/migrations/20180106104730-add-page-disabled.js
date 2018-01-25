'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return [
      queryInterface.addColumn('Pages', 'disabled', {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
