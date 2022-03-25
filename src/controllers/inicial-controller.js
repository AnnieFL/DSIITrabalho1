const { nanoid } = require('nanoid');

const cartas = require('../json/cartas.json').Cartas;

class InicialController {
    async index(req, res) {
        res.render('inicio', { user: req.session.user});
    }
    
    async lista(req, res) {
        const {user} = req.session;
        const userCartas = [];

        if (user && user.admin == false) {
            for (let i=0; i<user.cartas.length; i++) {
                for (let e=0; e<cartas.length; e++) {
                    if (user.cartas[i] == cartas[e].id) {
                        userCartas.push(cartas[e]);
                    }
                }
            }
            res.render('lista', {user: req.session.user, cartas: userCartas});
        } else if (!user) {
            res.redirect('/');
        } else {
            res.render('lista', {user: req.session.user, cartas: cartas});
        }
    }

    async detalha(req, res) {
        res.render('detalha', {user: req.session.user, carta: cartaEncontrada[0]});
    }

    async edita(req, res) {
        
    }

    async cria(req, res) {
        
    }

    async login(req, res) {
        const {cadastro} = req.query
        res.render('login', { cadastro: cadastro});
    }

    async logout(req,res) {
        req.session.user = null;
        res.redirect('/');
    }
}

module.exports = { InicialController }