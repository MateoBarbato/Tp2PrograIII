const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');


/* Leer todo los registros */
router.get('/', gamesController.getAll);

/* Leer por id */
router.get('/', gamesController.getById);

/* Actualizar por id */
router.patch('/', gamesController.update);

/* Eliminar por id */
router.delete('/', gamesController.delete);

/* Crear un registro */
router.post('/', gamesController.create);




module.exports = router;
