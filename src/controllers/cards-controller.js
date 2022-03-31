const { nanoid } = require('nanoid');

const cartas = require('../json/cartas.json').Cartas;

class CardsController {
    
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
            return res.render('lista', {user: req.session.user, cartas: userCartas});
        } else if (!user) {
            return res.redirect('/');
        } else {
            return res.render('lista', {user: req.session.user, cartas: cartas});
        }
    }

    async detalha(req, res) {
        const {id} = req.query
        if (!id) {
            return res.render('detalha', {user: req.session.user, carta: false})
        } else {
            const {id} = req.query;
            
            const cartaEncontrada = cartas.filter(c => c.id == id);
            if (cartaEncontrada.length > 0) {
                console.log(cartaEncontrada);
                return res.render('detalha', {user: req.session.user, carta: cartaEncontrada[0]});
            }
        }
    }

    async edita(req, res) {
        const {id} = req.body;
        
        cartas[id] = req.body;
        return res.redirect('/');
        
    }

    async cria(req, res) {
        req.body.id = cartas.length;

        cartas.push(req.body);
        return res.redirect('/');
    }

    async login(req, res) {
        const {cadastro} = req.query
        res.render('login', { cadastro: cadastro});
    }

    async logout(req,res) {
        req.session.user = null;
        res.redirect('/');
    }

    async organiza(req,res) {
        const {por} = req.params;

        if (por == "data") {

        } else if (por == "nome") {

        } else if (por == 'preco') {

        } else if (por == 'hp') {

        } else if (por == 'atk') {

        } else if (por == 'tipo') {

        }
        return res.redirect('/')
    }
}

module.exports = { CardsController }