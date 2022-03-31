const { Router } = require('express');
const routes = Router();

const { CardsController } = require('../controllers/cards-controller');
const cardsController = new CardsController();


routes.get('/login', cardsController.login);

routes.get('/logout', cardsController.logout);

routes.get("/detalhar", cardsController.detalha);

routes.get("/lista", cardsController.lista);

routes.post("/edita", cardsController.edita);

routes.post("/cria", cardsController.cria);

module.exports = routes;