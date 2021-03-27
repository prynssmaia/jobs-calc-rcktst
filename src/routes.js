const express = require('express');
const routes = express.Router();

//Funcção com a rota base, assim ela é chamada por várias rotas
const basePath = __dirname + "/views"

// Funções que direcionam para as páginas
// Request, response
routes.get('/', (resquest, response) => response.sendFile(basePath + "/index.html"))
routes.get('/job', (resquest, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (resquest, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (resquest, response) => response.sendFile(basePath + "/profile.html"))

// Exportando a função rotas
module.exports = routes;