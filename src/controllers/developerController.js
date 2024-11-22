const { Developer, Game, sequelize } = require("../models/index");

class DeveloperController {
  // Obtener todos los desarrolladores
  async getAll(req, res) {
    const t = await sequelize.transaction();
    try {
      const developers = await Developer.findAll({
        include: { model: Game, as: 'games' },
        transaction: t, // Usar transacción
      });
      await t.commit();
      res.status(200).json(developers);
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los desarrolladores.' });
    }
  }

  // Obtener un desarrollador por ID
  async getById(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const developer = await Developer.findByPk(id, {
        include: { model: Game, as: 'games' },
        transaction: t, // Usar transacción
      });
      if (!developer) {
        await t.rollback();
        return res.status(404).json({ error: 'Desarrollador no encontrado.' });
      }
      await t.commit();
      res.status(200).json(developer);
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el desarrollador.' });
    }
  }

  // Crear un nuevo desarrollador
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const { name, surname, specialty } = req.body;
      const newDeveloper = await Developer.create(
        { name, surname, specialty },
        { transaction: t } // Usar transacción
      );
      await t.commit();
      res.status(201).json(newDeveloper);
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al crear el desarrollador.' });
    }
  }

  // Eliminar un desarrollador
  async delete(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const developer = await Developer.findByPk(id, { transaction: t });
      if (!developer) {
        await t.rollback();
        return res.status(404).json({ error: 'Desarrollador no encontrado.' });
      }
      await developer.destroy({ transaction: t });
      await t.commit();
      res.status(200).json({ message: 'Desarrollador eliminado exitosamente.' });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el desarrollador.' });
    }
  }

  // Actualizar un desarrollador existente
  async update(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const updates = req.body;

      const developer = await Developer.findByPk(id, { transaction: t });
      if (!developer) {
        await t.rollback();
        return res.status(404).json({ error: 'Desarrollador no encontrado.' });
      }

      const camposActualizados = Object.keys(updates).filter(
        field => developer[field] !== updates[field]
      );

      if (camposActualizados.length === 0) {
        await t.rollback();
        return res.status(200).json({ message: 'No se realizó ninguna actualización porque los valores enviados no han cambiado.' });
      }

      await developer.update(updates, { transaction: t });
      await t.commit();
      res.status(200).json({ developer, camposActualizados });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el desarrollador.' });
    }
  }
}

module.exports = new DeveloperController();
