// Função que é executada para solicitar o pacote express
const express = require("express")
// Função sendo executada
const server = express()
const routes = require("./routes")

// Configurando Template Engine - EJS
server.set('view engine', 'ejs')

// Função midware que adiciona configuração ao servidor
// que habilita os arquivos estáticos, do ditório public
server.use(express.static("public"))

// Habilita o req.body nas rotas
server.use(express.urlencoded({ extended: true }))

// Rotas
server.use(routes)

// Server está utilizando a funcionalidade listen
// que sobe o servidor na porta desejada
server.listen(3001, () => console.log('Rodando em http://localhost:3001'))