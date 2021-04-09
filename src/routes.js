// Biblioteca Exprees para criar o servidor
const express = require('express');

const routes = express.Router();

// Funcção com a rota base, assim ela é chamada por várias rotas
// Utilixando o EJS, por padrão, ele já lê a pasta /views
// Desse modo não é necessário declarar uma função e tbm não precisa adicionar no route.get
// const basePath = __dirname + "/views"

const views = __dirname + "/views/"

const Profile = {
    data: {
      name: "Prynss",
      avatar: "https://github.com/prynssmaia.png",
      "monthly-budget": 3000,
      "days-per-week": 5,
      "hours-per-day": 5,
      "vacation-per-year": 4,
      "value-hour": 75,
    },
    
    controllers: {
      index(req, res) {
        return res.render(views + "profile", { profile: Profile.data })
      },
  
      update(req, res) {
        // req.body para pegar os dados
        const data = req.body
  
        // definir quantas semanas tem num ano: 52
        const weeksPerYear = 52
  
        // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12
        
        // total de horas trabalhadas na semana
        const weekTotalHours  = data["hours-per-day"] * data["days-per-week"]
  
        // horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
  
        // qual será o valor da minha hora?
        const valueHour = data["monthly-budget"] / monthlyTotalHours
  
        Profile.update({
          ...Profile.data,
          ...req.body,
          "value-hour": valueHour
        })
  
        return res.redirect('/profile')
      }
    },

}

// Refatorado
// Função controllers criada dentro do objeto Job 
// Services com as funções auxiliares
// Data é o controle dos dados
const Job = {
  data: [ 
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
    }],

  controllers: {
    index(req, res){
        const updatedJobs = Job.data.map((job) => {
          // Ajustes no job
          
          const remaining = Job.services.remainingDays(job)
          const status = remaining <= 0 ? 'done' : 'progress'
      
          return {
            ...job,
            remaining,
            status,
            budget: Profile.data["value-hour"] * job["total-hours"]
          }
        })      
      
        // Retorna a página index
        return res.render(views + "index",{ jobs: updatedJobs })
    },

    create(req, res){
      return res.render(views + "job")
    },

    save(req, res){
    // Empurra a requisição do body para o array jobs
    // ou seja req.body = { name: 'nome', 'daily-hours': 'numero', 'total-hours': 'numero' }

    // Função conta a quantidade de elementos do array
    // E subtrai 1, assim é atribuído ao número de id
    // Se não houver elementos no array, será atríbuido 1
    const lastId = Job.data[Job.data.length - 1] ? Job.data[Job.data.length - 1].id : 1;
   
    Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()        
    })

    // Retorna para a página inicial após salvar dados no array
    return res.redirect('/')
    }
  },

  services: {
    remainingDays(job) {
      // Calculo de tempo restante
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
        
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
    
      // Restam x dias para o fim do projeto
      return dayDiff
    }
  }
}


// Funções que direcionam para as páginas
// Req - Request, Res - Response
// Métodos GET
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.index)

// Método POST
routes.post('/job', Job.controllers.save)
routes.post('/profile', Profile.controllers.update)


// Exportando a função rotas
module.exports = routes;