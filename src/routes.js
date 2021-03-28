// Biblioteca Exprees para criar o servidor
const express = require('express');

const routes = express.Router();

// Funcção com a rota base, assim ela é chamada por várias rotas
// Utilixando o EJS, por padrão, ele já lê a pasta /views
// Desse modo não é necessário declarar uma função e tbm não precisa adicionar no route.get
// const basePath = __dirname + "/views"

const views = __dirname + "/views/"

// Funções que direcionam para as páginas
// Req - Request, Res - Response
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile"))

// Exportando a função rotas
module.exports = routes;