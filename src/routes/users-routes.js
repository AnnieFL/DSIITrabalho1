const { Router } = require('express');
const routes = Router();

const { UsersController } = require('../controllers/users-controller');
const usersController = new UsersController();

routes.post('/cadastrar', usersController.cadastrar);

routes.post('/login', usersController.login);

routes.get('/dark', usersController.dark);

routes.get('/perfil/:id', usersController.perfil);

routes.get("/", usersController.index);

module.exports = routes;