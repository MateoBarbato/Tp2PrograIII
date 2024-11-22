const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developerController');

const validate = require('../middlewares/validate');
const { param } = require('express-validator');

/* Leer todo los registros */
router.get('/getAll', developerController.getAll);

/* Leer por id */
router.get('/get/:id',validate([
    param('id').isInt().withMessage('ID invalido')
]), developerController.getById);

/* Eliminar por id */
router.delete('/delete/:id',validate([
    param('id').isInt().withMessage('ID invalido')
]), developerController.delete);

/* Crear un registro */
router.post('/create', developerController.create);

module.exports = router;