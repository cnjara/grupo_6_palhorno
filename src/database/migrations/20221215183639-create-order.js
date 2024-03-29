'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        }
      },
      date: {
        type: Sequelize.DATE
      },
      stateId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'States'
          },
          key : 'id'
        }
      },
      payRolesId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Payroles'
          },
          key : 'id'
        }
      },
      total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
       
        type: Sequelize.DATE
      },
      deletedAt:{
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};