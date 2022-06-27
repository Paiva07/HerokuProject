const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
const routes = require('./routes');

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Programação Web. Seja Bem-vindo!');
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta: ${port}`);
});
