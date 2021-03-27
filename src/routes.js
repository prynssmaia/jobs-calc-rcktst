const express = require('express');
const routes = express.Router();

// Funções que direcionam para as páginas
// Request, response
routes.get('/', (resquest, response) => {
    console.log('<--- Rodando routes.js --->')

    return response.sendFile(__dirname + "/views/index.html")
})

// Exportando a função rotas
module.exports = routes;