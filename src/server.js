// Função que é executada para solicitar o pacote express
const express = require("express")
// Função sendo executada
const server = express()
const routes = require("./routes")

// Função midware que adiciona configuração ao servidor
// que habilita os arquivos estáticos, do ditório public
server.use(express.static("public"))

// Rotas
server.use(routes)

// Server está utilizando a funcionalidade listen
// que sobe o servidor na porta desejada
server.listen(3001, () => console.log('rodando'))