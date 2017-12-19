'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return [
      queryInterface.addColumn('Comments', 'parent_post_fb_id', {
          type: Sequelize.STRING
      }),
      queryInterface.addColumn('Comments', 'parent_comment_fb_id', {
        type: Sequelize.STRING
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
