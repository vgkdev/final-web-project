"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("OrderDetails", "orderId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Orders",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("OrderDetails", "orderId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Orders",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },
};
