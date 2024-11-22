const {Developer,Game} = require("../models/index");

const developerController = {
    // Obtener todos los desarrolladores
    async getAll(req, res) {
        try {
            const developers = await Developer.findAll({
                include: { model: Game, as: 'games' }, // Incluye información de los juegos
            });
            res.status(200).json(developers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los desarrolladores.' });
        }
    },
    
    // Obtener un desarrollador por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log(id)
            const developer = await Developer.findByPk(id, {
                include: { model: Game, as: 'games' }, // Incluye información de los juegos
            });
            if (!developer) {
                return res.status(404).json({ error: 'Desarrollador no encontrado.' });
            }
            res.status(200).json(developer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el desarrollador.' });
        }
    },
    
    // Crear un nuevo desarrollador
    async create(req, res) {
        try {
            const { name, surname, specialty } = req.body;
            const newDeveloper = await Developer.create({ name, surname, specialty });
            res.status(201).json(newDeveloper);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el desarrollador.' });
        }
    },
        
    // Eliminar un desarrollador
    
    async delete(req, res) {
        try {
            const { id } = req.params;
            const developer = await Developer.findByPk(id);
    
            if (!developer) {
                return res.status(404).json({ error: 'Desarrollador no encontrado.' });
            }
    
            await developer.destroy();
            res.status(200).json({ message: 'Desarrollador eliminado exitosamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el desarrollador.' });
        }
    },

    // // Actualizar un desarrollador existente
    // async update(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { name, surname, specialty } = req.body;
    //         const developer = await Developer.findByPk(id);
    
    //         if (!developer) {
    //             return res.status(404).json({ error: 'Desarrollador no encontrado.' });
    //         }
    
    //         await developer.update({ name, surname, specialty });
    //         res.status(200).json(developer);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Error al actualizar el desarrollador.' });
    //     }
    // },


};

module.exports = developerController;