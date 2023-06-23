'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Posts', 'image', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Posts', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
