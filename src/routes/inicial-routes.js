const { Router } = require('express');
const routes = Router();

const { InicialController } = require('../controllers/inicial-controller');
const inicialController = new InicialController();


routes.get('/login', inicialController.login);

routes.get('/logout', inicialController.logout);

routes.get("/detalhar/:id", inicialController.detalha);

routes.get("/lista", inicialController.lista);

routes.get("/", inicialController.index);

routes.post("/edita", inicialController.edita);

routes.post("/cria", inicialController.cria);

module.exports = routes;