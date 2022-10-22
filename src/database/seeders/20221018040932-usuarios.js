"use strict";

const usuariosJson = require("../../data/usuarios.json");
const { hashSync } = require("bcryptjs");

const users = usuariosJson.map(
  ({ nombre, apellido, telefono, email, password, rolId}) => {
    return {
      nombre,
      apellido,
      telefono,
      email,
      password: hashSync(password, 10),
      avatar : null,
      rolId,
      createdAt: new Date(),
    };
  }
);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
    
     */
  },
};
