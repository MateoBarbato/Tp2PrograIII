const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('progra3', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

module.exports = sequelize;
