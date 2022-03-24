const users = [];

class UsersController {
    async cadastrar(req, res) {
        const user = req.body;
        users.push(user);

        console.log({users});
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
            res.send('Usuario e senha confirmados, login com sucesso!');
        } else {
            res.send("Senha não confere");
        }
    }

    async perfil(req, res) {
        res.render('perfil', {user: req.session.user, perfil: perfilEncontrado[0]});
    }
}

module.exports = {UsersController};