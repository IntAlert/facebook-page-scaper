'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return [
      queryInterface.addColumn('Posts', 'parent_page_id', {
				type: Sequelize.INTEGER
			}),
			queryInterface.addColumn('Comments', 'parent_post_id', {
				type: Sequelize.INTEGER
			}),
			queryInterface.addColumn('Comments', 'parent_comment_id', {
				type: Sequelize.INTEGER
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
