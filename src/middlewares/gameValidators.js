const validate = require('./validate');
const { param,body } = require('express-validator');


const validateBodyUpdateGame = [
    validate([
        param('id').isInt().withMessage('ID invalido'),

        body('name')
        .notEmpty().withMessage("No enviar campos vacios")
        .isString().withMessage('Nombre invalido'),

        body('type')
        .notEmpty().withMessage("No enviar campos vacios")
        .isIn(['Arcade', 'Strategy', 'Adventure', 'Sports']).withMessage('Tipo invalido. Posibles tipos: Arcade, Strategy, Adventure, Sports'),

        body('status')
        .notEmpty().withMessage("No enviar campos vacios")
        .isIn(['active', 'inactive']).withMessage('Estado invalido. Posibles estados: active, inactive'),

        body('platform')
        .notEmpty().withMessage("No enviar campos vacios")
        .isString().withMessage('Plataforma invalido'),
    ])
]



module.exports = { validateBodyUpdateGame };