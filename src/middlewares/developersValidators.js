const validate = require('./validate');
const { param,body } = require('express-validator');


const validateBodyCreateDeveloper = [
    validate([

        body('name')
        .notEmpty().withMessage("Campo vacio")
        .isString().withMessage('Nombre invalido'),

        body('surname')
        .notEmpty().withMessage("No enviar campos vacios")
        .isString().withMessage('Apellido invalido'),

        body('specialty')
        .notEmpty().withMessage("No enviar campos vacios")
        .isString().withMessage('Especialidad invalido')

    ])
]


module.exports = { validateBodyCreateDeveloper };