const session = require('express-session');
const { redirect } = require('express/lib/response');
const { nanoid } = require('nanoid');

const cartas = require('../json/cartas.json').Cartas;

class CardsController {
    
    async lista(req, res) {
        const {user} = req.session;
        const userCartas = [];

        const {por} = req.query;
        
        if (user && user.admin == false) {
            for (let i=0; i<user.cartas.length; i++) {
                for (let e=0; e<cartas.length; e++) {
                    if (user.cartas[i] == cartas[e].id) {
                        userCartas.push(cartas[e]);
                    }
                }
            }

            if (por == "nomeAsc") {
                userCartas.sort((a, b) => {
                    let na = a.nome.toLowerCase();
                    let nb = b.nome.toLowerCase();
                
                    if (na > nb) {
                        return -1;
                    }
                    if (na < nb) {
                        return 1;
                    }
                    return 0;
                });
            } else if (por == "dataAsc") {
                userCartas.sort((a, b) => a.data - b.data);
            } else if (por == "dataDesc") {
                userCartas.sort((a, b) => b.data - a.data);
            } else if (por == "hpAsc") {
                userCartas.sort((a, b) => a.hp - b.hp);
            } else if (por == "hpDesc") {
                userCartas.sort((a, b) => b.hp - a.hp);
            } else if (por == "atkAsc") {
                userCartas.sort((a, b) => a.atk - b.atk);
            } else if (por == "atkDesc") {
                userCartas.sort((a, b) => b.atk - a.atk);
            } else if (por == "precoAsc") {
                userCartas.sort((a, b) => a.preco - b.preco);
            } else if (por == "precoDesc") {
                userCartas.sort((a, b) => b.preco - a.preco);
            } else {
                userCartas.sort((a, b) => {
                    let na = a.nome.toLowerCase();
                    let nb = b.nome.toLowerCase();
                
                    if (na < nb) {
                        return -1;
                    }
                    if (na > nb) {
                        return 1;
                    }
                    return 0;
                });
            }
    
            return res.render('lista', {user: req.session.user, cartas: userCartas});
        } else if (!user) {
            return res.redirect('/');
        } else {
            if (por == "nomeAsc") {
                cartas.sort((a, b) => {
                    let na = a.nome.toLowerCase();
                    let nb = b.nome.toLowerCase();
                
                    if (na > nb) {
                        return -1;
                    }
                    if (na < nb) {
                        return 1;
                    }
                    return 0;
                });
            } else if (por == "dataAsc") {
                cartas.sort((a, b) => a.data - b.data);
            } else if (por == "dataDesc") {
                cartas.sort((a, b) => b.data - a.data);
            } else if (por == "hpAsc") {
                cartas.sort((a, b) => a.hp - b.hp);
            } else if (por == "hpDesc") {
                cartas.sort((a, b) => b.hp - a.hp);
            } else if (por == "atkAsc") {
                cartas.sort((a, b) => a.atk - b.atk);
            } else if (por == "atkDesc") {
                cartas.sort((a, b) => b.atk - a.atk);
            } else if (por == "precoAsc") {
                cartas.sort((a, b) => a.preco - b.preco);
            } else if (por == "precoDesc") {
                cartas.sort((a, b) => b.preco - a.preco);
            } else {
                cartas.sort((a, b) => {
                    let na = a.nome.toLowerCase();
                    let nb = b.nome.toLowerCase();
                
                    if (na < nb) {
                        return -1;
                    }
                    if (na > nb) {
                        return 1;
                    }
                    return 0;
                });
            }
    
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
        
        const date =  new Date(); 
        if (date.getMonth()+1 >= 10 && date.getDate() >= 10) {
            req.body.data = ""+date.getFullYear()+(date.getMonth()+1)+date.getDate();
        } else if (date.getDate() >= 10) {
            req.body.data = date.getFullYear()+"0"+(date.getMonth()+1)+date.getDate();
        } else if (date.getMonth()+1 >= 10) {
            req.body.data = date.getFullYear()+(date.getMonth()+1)+"0"+date.getDate();
        } else {
            req.body.data = date.getFullYear()+"0"+(date.getMonth()+1)+"0"+date.getDate();
        }

        req.body.efeito = req.body.efeito.split(";");
        for (let i = 0; i<req.body.efeito.length; i++) {
            req.body.efeito[i].trim();
        }
        req.body.trigger = req.body.trigger.split(";");
        for (let i = 0; i<req.body.trigger.length; i++) {
            req.body.trigger[i].trim();
        }

        for (let i = 0; i < cartas.length; i++) {
            if (cartas[i].id == id) {
                cartas[i] = req.body;
                return res.redirect('/');
            } 
        }
        return res.redirect('/');
        
    }

    async cria(req, res) {
        req.body.id = nanoid(8);

        const date =  new Date(); 
        if (date.getMonth()+1 >= 10 && date.getDate() >= 10) {
            req.body.data = ""+date.getFullYear()+(date.getMonth()+1)+date.getDate();
        } else if (date.getDate() >= 10) {
            req.body.data = date.getFullYear()+"0"+(date.getMonth()+1)+date.getDate();
        } else if (date.getMonth()+1 >= 10) {
            req.body.data = date.getFullYear()+(date.getMonth()+1)+"0"+date.getDate();
        } else {
            req.body.data = date.getFullYear()+"0"+(date.getMonth()+1)+"0"+date.getDate();
        }

        req.body.efeito = req.body.efeito.split(";");
        for (let i = 0; i<req.body.efeito.length; i++) {
            req.body.efeito[i].trim();
        }
        req.body.trigger = req.body.trigger.split(";");
        for (let i = 0; i<req.body.trigger.length; i++) {
            req.body.trigger[i].trim();
        }

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

    async bonus(req,res) {
        const numAleatorio = Math.floor(Math.random()*cartas.length)
        const cartaAleatoria = cartas[numAleatorio].id;

        if (req.session.user) {
            req.session.user.cartas.push(cartaAleatoria);
            res.render('bonus', {user: req.session.user, carta: cartas[numAleatorio]});
        } else {
            res.redirect('/');
        }
    }
}

module.exports = { CardsController }