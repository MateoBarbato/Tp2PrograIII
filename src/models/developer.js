const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");
// const Game = require('./game');

const Developer = sequelize.define('Developer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // MySQL-managed
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // MySQL-managed
  },
}, {
  timestamps: true,
  updatedAt: false, // Disable Sequelize's auto-update for updatedAt
});

// Developer.hasMany(Game, { foreignKey: 'developerId', as: 'games' }); // Association

module.exports = Developer;
