"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "gender", {
        type: Sequelize.STRING,
      }),
      queryInterface.changeColumn("Users", "image", {
        type: Sequelize.BLOB("long"),
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "gender", {
        type: Sequelize.BOLEAN,
      }),
      queryInterface.changeColumn("Users", "image", {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
