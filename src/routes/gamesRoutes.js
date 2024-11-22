const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const {validateBodyUpdateGame, validateBodyCreateGame} = require('../middlewares/gameValidators');

const validate = require('../middlewares/validate');
const { param } = require('express-validator');


/* Leer todo los registros */
router.get('/getAll', gamesController.getAll);

/* Leer por id */
router.get('/get/:id', validate([
    param('id').isInt().withMessage('ID invalido')
]), gamesController.getById);

/* Actualizar por id */
router.patch('/update/:id',validateBodyUpdateGame, gamesController.update);

/* Eliminar por id */
router.delete('/delete/:id',validate([
    param('id').isInt().withMessage('ID invalido')
]), gamesController.delete);

/* Crear un registro */
router.post('/create', validateBodyCreateGame , gamesController.create);




module.exports = router;
