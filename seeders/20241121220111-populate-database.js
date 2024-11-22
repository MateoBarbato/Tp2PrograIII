'use strict';

/** @type {import('sequelize-cli').Migration} */

const gamesData = require('./dataGames.json');
const developerData = require('./dataDeveloper.json')

module.exports = {
  async up (queryInterface, Sequelize) {

        // Poblar la tabla Developers
    await queryInterface.bulkInsert('Developers', developerData);

    // Poblar la tabla Games
    await queryInterface.bulkInsert('Games', gamesData);
  },


  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Developers', null, {});
  }
};
