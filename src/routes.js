// Biblioteca Exprees para criar o servidor
const express = require('express');

const routes = express.Router();

// Funcção com a rota base, assim ela é chamada por várias rotas
// Utilixando o EJS, por padrão, ele já lê a pasta /views
// Desse modo não é necessário declarar uma função e tbm não precisa adicionar no route.get
// const basePath = __dirname + "/views"

const views = __dirname + "/views/"

const profile = {
    name: "Prynss",
    avatar: "https://github.com/prynssmaia.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}
// Controle de Jobs
const jobs = [
    {}
]


// Funções que direcionam para as páginas
// Req - Request, Res - Response

// Métodos GET
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile: profile}))

// Métodos POST
routes.post('/job', (req, res) => {
    console.log(req.body)
})


// Exportando a função rotas
module.exports = routes;