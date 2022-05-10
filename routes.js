const express = require('express');
const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController');
const MarcaController = require('./controllers/MarcaController');
const CarroController = require('./controllers/CarroController');
const ManutencaoController = require('./controllers/ManutencaoController');
const login = require('./middlewares/login');

routes
  .get('/usuarios', UsuarioController.index)
  .post('/usuarios', UsuarioController.store)
  .post('/login', UsuarioController.login)
  .get('/senhas', login, UsuarioController.senhas)
  .get('/carros', CarroController.index)
  .get('/marcas', MarcaController.index)
  .post('/marcas', MarcaController.store)
  .post('/carros', CarroController.store)
  .put('/carros/:id', CarroController.update)
  .delete('/carros/:id', CarroController.delete)
  .put('/carros/destaque/:id', CarroController.updateDestaque)
  .get('/carros/destaque', CarroController.indexDestaque)
  .get('/carros/filtro/:filtro', CarroController.pesquisa)
  .get('/carros/anos-cad', CarroController.pesqYear)
  .get('/manutencao', ManutencaoController.index)
  .post('/manutencao', ManutencaoController.store)
  .put('/manutencao/:id', ManutencaoController.update)
  .delete('/manutencao/:id', ManutencaoController.delete)
  // .get('/carros/marcas-num', CarroController.pesqMarca)
  .get('/carros/:id', CarroController.pesqId);

module.exports = routes;
