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
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2, 
      "total-hours": 1, 
      created_at: Date.now()
    },
    {
      id: 2,
      name: "313 Project",
      "daily-hours": 3, 
      "total-hours": 47, 
      created_at: Date.now()
    }];


// Funções que direcionam para as páginas
// Req - Request, Res - Response

// Métodos GET
routes.get('/',(req, res) => {
  const updatedJobs = jobs.map((job) => {
    // Ajustes no job
    // Calculo de tempo restante
    const remainingDays = job['total-hours'] / job['daily-hours'].toFixed()
    
    // Constante Data de criação do projeto
    const createdDate = new Date(job.created_at)

    // Constante Dia de vencimento é resultante da soma do dia de criação do projeto
    // mais o número de dias remescentes
    const dueDay = createdDate.getDate() + Number(remainingDays)

    // Constate com a Data exata do dia de vencimento.
    const dueDateInMs = createdDate.setDate(dueDay)

    // Constante Diferença de Tempo em Milesegundos é o resultado
    // da subtração da data de vencimento menos o dia de hoje.
    const timeDiffInMs = dueDateInMs - Date.now()

    // Transforma milisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24

    // Constante Diferenã de Dias é o produto da divsão
    // entre Difença de Tempo em Millisegundos divido pelo Dia em Millisegundos
    const dayDiff = (timeDiffInMs / dayInMs).toFixed()

    return job
  })


  // Retorna a página index
  return res.render(views + "index",{ jobs })
});
routes.get('/job', (req, res) => res.render(views + "job"))
// Método POST
routes.post('/job', (req, res) => {
    // Empurra a requisição do body para o arra jobs
    // ou seja req.body = { name: 'nome', 'daily-hours': 'numero', 'total-hours': 'numero' }

    // Função conta a quantidade de elementos do array
    // E subtrai 1, assim é atribuído ao número de id
    // Se não houver elementos no array, será atríbuido 1
    const lastId = jobs[jobs.length - 1] ? jobs[jobs.length - 1].id : 1;
   
    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()        
    })

    // Retorna para a página inicial após salvar dados no array
    return res.redirect('/')
});
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile: profile}))



// Exportando a função rotas
module.exports = routes;