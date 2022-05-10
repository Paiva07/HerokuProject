const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dbKnex = require('../data/db_config');

const saltRounds = 10;

module.exports = {
  async index(req, res) {
    try {
      const usuarios = await dbKnex('usuarios');
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async store(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      res.status(400).json({ msg: 'Enviar nome, email, e senha' });
      return;
    }
    try {
      const dados = await dbKnex('usuarios').where({ email });
      if (dados.length) {
        res.status(400).json({ erro: 'E-mail já cadastrado' });
        return;
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(senha, salt);

    try {
      const novo = await dbKnex('usuarios').insert({
        nome,
        email,
        senha: hash,
      });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      res.status(400).json({ msg: 'Login/Senha incorretos' });
      return;
    }
    try {
      const dados = await dbKnex('usuarios').where({ email });
      if (dados.length == 0) {
        res.status(400).json({ msg: 'Login/Senha incorretos' });
        return;
      }
      if (bcrypt.compareSync(senha, dados[0].senha)) {
        const token = jwt.sign(
          {
            usuario_id: dados[0].id,
            usuario_nome: dados[0].nome,
          },
          process.env.JWT_KEY,
          { expiresIn: '1h' },
        );
        res.status(200).json({
          token,
          usuario_id: dados[0].id,
          usuario_nome: dados[0].nome,
        });
      } else {
        res.status(400).json({ msg: 'Login/Senha incorretos' });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async senhas(req, res) {
    res.status(200).json({ senhas: 'Senha' });
  },
};
