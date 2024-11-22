const {Developer,Game} = require("../models/index");

class GamesController  {

  // Obtener todos los juegos
  async getAll(req, res) {
    try {
      const {
        page,
        limit,
        sort = 'ASC', //Orden default de la consulta
        type,
        status,
      } = req.query;
  
      // Prepare filters
      const filters = {};
      if (type) {
        filters.type = type; // Filtra por tipo/categoria
      }
      if (status) {
        filters.status = status; // Filtra por estado
      }
  
      // Opciones basicas de la consulta filtrada
      let options = {
        where: filters,
        order: [['createdAt', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']],
      };
  
      // Maneja la paginación opcional
      if (page && limit) {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        if (isNaN(pageNum) || isNaN(limitNum) || pageNum <= 0 || limitNum <= 0) {
          return res.status(400).json({ error: 'Page and limit must be positive integers.' });
        }
        const offset = (pageNum - 1) * limitNum;
        options = { ...options, limit: limitNum, offset };
      }
  
      // Query la db
      const games = await Game.findAll(options);
      const gamesTotal = await Game.findAll();

      const maxPagePossible = Math.ceil(gamesTotal.length / limit);
  
      // Calcula el total de registros
      let total = 0;
      if (page && limit) {
        total = await Game.count({ where: filters });
      }
  
      // Enviar el resultado
      res.status(200).json({
        total: total || games.length, 
        maxPagePossible,
        page: page || null, 
        limit: limit || null,
        games
       
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching games.' });
    }
  }

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
  }

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
  }

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
  }

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
  }
};

module.exports = new GamesController();
