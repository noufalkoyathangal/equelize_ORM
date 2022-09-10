"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("Comments", {
      type: "FOREIGN KEY",
      fields: ["productId"],
      references: {
        name: "postid-fk-in-comments",
        table: "Products",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint("Comments", "postid-fk-in-comments");
  },
};
