const dbKnex = require('../data/db_config');

module.exports = {
  async index(req, res) {
    try {
      const carros = await dbKnex('carros as c')
        .select(
          'c.id',
          'modelo',
          'foto',
          'ano',
          'preco',
          'm.nome as marca',
          'u.nome as usuario',
        )
        .innerJoin('marcas as m', 'marca_id', 'm.id')
        .innerJoin('usuarios as u', 'usuario_id', 'u.id');
      res.status(200).json(carros); // retorna statusCode ok e os dados
    } catch (error) {
      res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
  },

  async store(req, res) {
    const { modelo, foto, ano, preco, marca_id, usuario_id } = req.body;
    if (!modelo || !foto || !ano || !preco || !marca_id || !usuario_id) {
      res.status(400).json({ msg: 'Erro, enserir todos os dados!' });
      return;
    }
    try {
      const novo = await dbKnex('carros').insert({
        modelo,
        foto,
        ano,
        preco,
        marca_id,
        usuario_id,
      });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async update(req, res) {
    const id = req.params.id;
    const { modelo, foto, ano, preco, marca_id, usuario_id } = req.body;
    try {
      await dbKnex('carros')
        .update({ modelo, foto, ano, preco, marca_id, usuario_id })
        .where('id', id);
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async delete(req, res) {
    const id = req.params.id;
    try {
      await dbKnex('carros').del().where('id', id);
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async updateDestaque(req, res) {
    const id = req.params.id;
    const dados = await dbKnex('carros').where({ id });
    try {
      if (dados[0].destaque == true) {
        await dbKnex('carros').update({ destaque: false }).where('id', id);
        res.status(200).json({ destaque: 'Altera pra False' });
        return;
      }
      if (dados[0].destaque == false) {
        await dbKnex('carros').update({ destaque: true }).where('id', id);
        res.status(200).json({ destaque: 'Altera pra True' });
        return;
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async indexDestaque(req, res) {
    const dados = await dbKnex('carros');
    if (dados[0].destaque == true) {
      try {
        const carros = await dbKnex('carros').where({ destaque: true });
        res.status(200).json(carros);
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    }
    if (dados[0].destaque == false) {
      try {
        res.status(200).json({ msg: 'Sem Carros em destaque' });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    }
  },
  async pesquisa(req, res) {
    const { filtro } = req.params;
    try {
      const carros = await dbKnex('carros as c')
        .select(
          'c.id',
          'modelo',
          'foto',
          'ano',
          'preco',
          'm.nome as marca',
          'u.nome as usuario',
        )
        .innerJoin('marcas as m', 'marca_id', 'm.id')
        .innerJoin('usuarios as u', 'usuario_id', 'u.id')
        .where('modelo', 'like', `%${filtro}%`)
        .orWhere('marca', 'like', `%${filtro}%`);
      res.status(200).json(carros);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async pesqId(req, res) {
    const id = req.params.id;
    try {
      const carro = await dbKnex('carros as c')
        .select(
          'c.id',
          'modelo',
          'foto',
          'ano',
          'preco',
          'm.nome as marca',
          'u.nome as usuario',
        )
        .innerJoin('marcas as m', 'marca_id', 'm.id')
        .innerJoin('usuarios as u', 'usuario_id', 'u.id')
        .where('c.id', id);
      if (carro.length == 0) {
        res.status(200).json({ msg: 'Não há carros com este ID' });
      } else {
        res.status(200).json(carro);
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async pesqYear(req, res) {
    try {
      const carro = await dbKnex('carros').select('created_at');
      const num = await dbKnex('carros').count({
        VeiculosInseridos: 'created_at',
      });
      res.status(200).json({ carro: carro, Quantidade: num });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  // async pesqMarca(req, res) {
  //   try {
  //     const carro = await dbKnex('carros as c')
  //       .select('m.nome as marca')
  //       .innerJoin('m.nome', 'c')
  //       .count({ num: 'm.nome' });
  //     res.status(200).json(carro);
  //   } catch (error) {
  //     res.status(400).json({ msg: error.message });
  //   }
  // },
};
