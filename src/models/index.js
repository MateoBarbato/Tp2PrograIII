const sequelize = require('../config/db');
const Developer = require('./Developer');
const Game = require('./Game');

// Relación: Un Developer tiene muchos Games
Developer.hasMany(Game, { foreignKey: 'developerId', as: 'games' });

Game.belongsTo(Developer, { foreignKey: 'developerId', as: 'developer' });

module.exports = { sequelize, Developer, Game };
