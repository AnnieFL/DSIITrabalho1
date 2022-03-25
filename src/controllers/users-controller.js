const { nanoid } = require('nanoid');

const users = require('../json/users.json').Usuarios;

class UsersController {
    async cadastrar(req, res) {
        req.body.admin = false;
        req.body.id = nanoid(8);

        const date =  new Date(); 
        req.body.data = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
        req.body.cartas = [];
        const user = req.body;
        users.push(user);

        req.session.user = user;
        res.redirect('/');
    }

    async login(req, res) {
        //ACHAR O EMAIL
        const {email, senha} = req.body;
        const usuarioEncontrado = users.find(u => u.email == email);

        if (!usuarioEncontrado) return res.send('User nao encontrado');
        
        //VERIFICA SENHA
        if (usuarioEncontrado.senha == senha) {
            req.session.user = usuarioEncontrado;
            res.redirect('/');
        } else {
            res.send("Senha não confere");
        }
    }

    async perfil(req, res) {
        const {id} = req.params;
        
        const perfilEncontrado = users.filter(u => u.id == id);
        if (perfilEncontrado.length > 0) {
            res.render('perfil', {user: req.session.user, perfil: perfilEncontrado[0]});
        }
    }
}

module.exports = {UsersController};