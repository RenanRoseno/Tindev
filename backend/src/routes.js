const express = require('express');
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DisLikeController = require('./controllers/DisLikeController')

const routes = express.Router(); //Objetos para rotas


routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DisLikeController.store)

module.exports = routes //Exportação de rotas


/*

routes.get('/', (req, res) => {
    return res.json({message: `Olá ${req.query.name}`});
});

Requisição e resposta (REST) [PUT, POST, DELETE, GET]
*  server.get Rota para acessar servidor
*/