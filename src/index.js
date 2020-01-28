const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://omnistack:jurema123@cluster0-sgmdr.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);
// MÉTODOS HTTP: get, post, put, delete

// TIPOS DE PARÂMETROS:
// Query Params: request.query (Filtros, ordenação, paganação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para a criação ou alteração de um registro)

// MongoDB (Banco de dados Não-Relacional)

app.listen(3051);