const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');


/* Leer todo los registros */
router.get('/', gamesController.getAll);

/* Leer por id */
router.get('/', gamesController.getById);

/* Actualizar por id */
router.get('/', gamesController.update);

/* Eliminar por id */
router.get('/', gamesController.delete);

/* Crear un registro */
router.get('/', gamesController.create);




module.exports = router;
