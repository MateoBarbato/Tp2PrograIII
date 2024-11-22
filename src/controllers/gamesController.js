const {Developer,Game} = require("../models/index");

const gamesController = {
  // Obtener todos los juegos
  async getAll(req, res) {
    try {
      const games = await Game.findAll({
        include: { model: Developer, as: 'developer' }, // Incluye información de la desarrolladora
      });
      res.status(200).json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los juegos.' });
    }
  },

  // Obtener un juego por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id, {
        include: { model: Developer, as: 'developer' }, // Incluye información de la desarrolladora
      });
      if (!game) {
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }
      res.status(200).json(game);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el juego.' });
    }
  },

  // Crear un nuevo juego
  async create(req, res) {
    try {
      const { name, type, status, platform, developerId } = req.body;
      const newGame = await Game.create({ name, type, status, platform, developerId });
      res.status(201).json(newGame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el juego.' });
    }
  },

  // Actualizar un juego existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, type, status, platform, developerId } = req.body;
      const game = await Game.findByPk(id);

      if (!game) {
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }

      await game.update({ name, type, status, platform, developerId });
      res.status(200).json(game);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el juego.' });
    }
  },

  // Eliminar un juego
  async delete(req, res) {
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id);

      if (!game) {
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }

      await game.destroy();
      res.status(200).json({ message: 'Juego eliminado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el juego.' });
    }
  },
};

module.exports = gamesController;
