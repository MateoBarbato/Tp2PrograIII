const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");
// const Developer = require('./developer');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Arcade', 'Strategy', 'Adventure', 'Sports'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  developerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Developers',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // This reflects MySQL's default CURRENT_TIMESTAMP
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // This reflects the MySQL trigger for updates
  },
}, {
  timestamps: true, // Sequelize will expect createdAt and updatedAt fields
  updatedAt: false, // Disable Sequelize's auto-update for updatedAt
});

// Game.belongsTo(Developer, { foreignKey: 'developerId', as: 'developer' }); // Association

module.exports = Game;
