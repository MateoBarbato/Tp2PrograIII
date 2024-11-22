const sequelize = require('./db');
const {Developer,Game} = require("../models/index");

(async () => {

  try {
    
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
    
    // await sequelize.sync({ alter: true });
    // console.log('Modelos sincronizados.');

  } catch (error) {

    console.error('No se pudo conectar a la base de datos:', error);
  }
  
})();
