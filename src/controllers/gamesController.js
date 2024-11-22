const { Developer, Game, sequelize } = require("../models/index");

class GamesController {
  // Obtener todos los juegos
  async getAll(req, res) {
    const t = await sequelize.transaction();
    try {
      const { page, limit, sort = 'ASC', type, status } = req.query;

      // Prepare filters
      const filters = {};
      if (type) filters.type = type;
      if (status) filters.status = status;

      // Opciones básicas de consulta
      let options = {
        where: filters,
        order: [['createdAt', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']],
        transaction: t, // Usar transacción
      };

      // Manejo de paginación
      if (page && limit) {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        if (isNaN(pageNum) || isNaN(limitNum) || pageNum <= 0 || limitNum <= 0) {
          await t.rollback();
          return res.status(400).json({ error: 'Page and limit must be positive integers.' });
        }
        const offset = (pageNum - 1) * limitNum;
        options = { ...options, limit: limitNum, offset };
      }

      const games = await Game.findAll(options);
      const total = await Game.count({ where: filters, transaction: t });

      await t.commit();
      res.status(200).json({
        total,
        page: page || null,
        limit: limit || null,
        games,
      });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error fetching games.' });
    }
  }

  // Obtener un juego por ID
  async getById(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id, {
        include: { model: Developer, as: 'developer' },
        transaction: t, // Usar transacción
      });
      if (!game) {
        await t.rollback();
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }
      await t.commit();
      res.status(200).json(game);
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el juego.' });
    }
  }

  // Crear un nuevo juego
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const { name, type, status, platform, developerId } = req.body;

      const developer = await Developer.findByPk(developerId, { transaction: t });
      if (!developer) {
        await t.rollback();
        return res.status(404).json({ error: 'Desarrollador no encontrado.' });
      }

      const newGame = await Game.create(
        { name, type, status, platform, developerId },
        { transaction: t } // Usar transacción
      );

      await t.commit();
      res.status(201).json(newGame);
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al crear el juego.' });
    }
  }

  // Actualizar un juego existente
  async update(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const updates = req.body;

      const game = await Game.findByPk(id, { transaction: t });
      if (!game) {
        await t.rollback();
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }

      const camposActualizados = Object.keys(updates).filter(
        field => game[field] !== updates[field]
      );

      if (camposActualizados.length === 0) {
        await t.rollback();
        return res.status(200).json({ message: 'No se realizó ninguna actualización porque los valores enviados no han cambiado.' });
      }

      await game.update(updates, { transaction: t }); // Usar transacción
      await t.commit();
      res.status(200).json({ game, camposActualizados });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el juego.' });
    }
  }

  // Eliminar un juego
  async delete(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      const game = await Game.findByPk(id, { transaction: t });
      if (!game) {
        await t.rollback();
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }

      await game.destroy({ transaction: t }); // Usar transacción
      await t.commit();
      res.status(200).json({ message: 'Juego eliminado exitosamente.' });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el juego.' });
    }
  }
}

module.exports = new GamesController();
