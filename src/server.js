// Função que é executada para solicitar o pacote express
const express = require("express")

// Função sendo executada
const server = express()

// Funções que direcionam para as páginas
// Request, response
server.get('/', (resquest, response) => {
    console.log('Entrei no index')

    return response.send('Hello node')
})

// Server está utilizando a funcionalidade listen
// que sobe o servidor na porta desejada
server.listen(3001, () => console.log('rodando'))