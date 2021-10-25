'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemPedidos', { //nome da tabela sempre no plural
     // nome da tabela + nome do campo
      PedidoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'pedidos', // smpre o nome da tabela no plural
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      },
      // segunda chave estrangeira
      ServicoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'servicos', // smpre o nome da tabela no plural
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.FLOAT
      },
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
    await queryInterface.dropTable('ItemPedidos');
  }
};