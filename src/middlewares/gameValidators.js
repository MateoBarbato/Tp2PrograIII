const validate = require('./validate');
const { param,body } = require('express-validator');
const {Developer} = require("../models/index");

const validateBodyUpdateGame = [
    validate([
        param('id').isInt().withMessage('ID invalido'),

        body('name')
        .optional()
        .isString().withMessage('Nombre invalido'),

        body('type')
        .optional()
        .isIn(['Arcade', 'Strategy', 'Adventure', 'Sports']).withMessage('Tipo invalido. Posibles tipos: Arcade, Strategy, Adventure, Sports'),

        body('status')
        .optional()
        .isIn(['active', 'inactive']).withMessage('Estado invalido. Posibles estados: active, inactive'),

        body('platform')
        .optional()
        .isString().withMessage('Plataforma invalido'),
    ])
]



const validateBodyCreateGame = [
    validate([
        body('developerId').notEmpty().withMessage("El id del desarollador es obligatorio").isInt().withMessage('ID invalido'),

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



const validateDeveloperExists = () => async (req, res, next) => {
    const { developerId } = req.body; 

    const desarrolladorEncontrado = await Developer.findByPk(developerId)
    
    if(!desarrolladorEncontrado){
        return res.status(404).json({error:"Desarrolador no encontrado."})
    }
    next();
};



module.exports = { validateBodyUpdateGame, validateBodyCreateGame,validateDeveloperExists };