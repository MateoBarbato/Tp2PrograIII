const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developerController');



/* Leer todo los registros */
router.get('/', developerController.getAll);

/* Leer por id */
router.get('/', developerController.getById);

/* Actualizar por id */
router.get('/', developerController.update);

/* Eliminar por id */
router.get('/', developerController.delete);

/* Crear un registro */
router.get('/', developerController.create);

module.exports = router;