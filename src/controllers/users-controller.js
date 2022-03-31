const { nanoid, random } = require('nanoid');

const users = require('../json/users.json').Usuarios;

class UsersController {
    async index(req, res) {
        if (req.session.user) {
            const outrosUsers = users.filter(u => u.id != req.session.user.id);
            return res.render('inicio', { user: req.session.user, outrosUsers:outrosUsers});
        }
        return res.render('inicio', { user: req.session.user, outrosUsers:users});
    }

    async cadastrar(req, res) {
        req.body.admin = false;
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
        req.body.cartas = [];
        const user = req.body;
        users.push(user);

        req.session.user = user;
        return res.redirect('/');
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
            res.redirect('/');
        }
    }

    async perfil(req, res) {
        const {id} = req.params;
        
        const perfilEncontrado = users.filter(u => u.id == id);
        if (perfilEncontrado.length > 0) {
            res.render('perfil', {user: req.session.user, perfil: perfilEncontrado[0]});
        }
    }

    async dark(req,res) {
        if (req.session.user) {
            const {id} = req.session.user;
    
            for (let i=0; i<users.length; i++) {
                if (id == users[i].id) {
                    if (users[i].dark == "off") {
                        users[i].dark = "on";
                        req.session.user.dark = 'on';
                        return res.redirect('/perfil/'+id);
                    } else {
                        users[i].dark = "off";
                        req.session.user.dark = 'off';
                        return res.redirect('/perfil/'+id);
                    }
                }
            }
        }
        return res.redirect('/');
    }

    async organiza(req, res) {
        const {por} = req.params;

        if (por == 'recente') {
            const datas = [];
            for (let i = 0; i<users.length; i++) {
                datas.push(users[i].data);
            }

        } else if (por == 'antigo') {

        } else {

        }
        return res.redirect('/')
    }
}

module.exports = {UsersController};