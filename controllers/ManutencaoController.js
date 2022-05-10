const dbKnex = require('../data/db_config');

module.exports = {
  async index(req, res) {
    try {
      const manutencao = await dbKnex('manutencao as m')
        .select(
          'm.id',
          'servico',
          'prestador',
          'mecanico',
          'seguro',
          'm.preco',
          'c.modelo as carro',
        )
        .innerJoin('carros as c', 'carro_id', 'c.id');
      res.status(200).json(manutencao);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async store(req, res) {
    const { servico, prestador, mecanico, seguro, preco, carro_id } = req.body;
    if (!servico || !prestador || !mecanico || !seguro || !preco || !carro_id) {
      res.status(400).json({ msg: 'Erro, enserir todos os dados!' });
      return;
    }
    try {
      const novo = await dbKnex('manutencao').insert({
        servico,
        prestador,
        mecanico,
        seguro,
        preco,
        carro_id,
      });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async update(req, res) {
    const id = req.params.id;
    const { servico, prestador, mecanico, seguro, preco, carro_id } = req.body;
    try {
      await dbKnex('manutencao')
        .update({ servico, prestador, mecanico, seguro, preco, carro_id })
        .where('id', id);
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async delete(req, res) {
    const id = req.params.id;
    try {
      await dbKnex('manutencao').del().where('id', id);
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};
