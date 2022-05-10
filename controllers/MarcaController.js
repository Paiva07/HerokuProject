const dbKnex = require('../data/db_config');

module.exports = {
  async index(req, res) {
    try {
      const marcas = await dbKnex('marcas');
      res.status(200).json(marcas);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async store(req, res) {
    const { nome } = req.body;
    if (!nome) {
      res.status(400).json({ msg: 'Erro, enserir todos os dados!' });
      return;
    }
    try {
      const dados = await dbKnex('marcas').where({ nome });
      if (dados.length) {
        res.status(400).json({ erro: 'Marca já cadastrada' });
        return;
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }

    try {
      const novo = await dbKnex('marcas').insert({
        nome,
      });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};
