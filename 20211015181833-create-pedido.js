'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      ClienteId: { // chave estrangeira vinda da tabela cliente
        allowNull: false, // campo obrigatorio
        type: Sequelize.INTEGER,
        references: { // chave da tabela Clientes
          model:'clientes',//sempre no plural
          key: 'id'
        },
        //caso o cliente seja eliminado ou atualizado, deve ser em cascata
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      },
      // sempre deixa esses dois campos
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};