const cartas = [];

class InicialController {
    async index(req, res) {
        res.render('inicio', { user: req.session.user});
    }
    
    async lista(req, res) {
        res.render('lista', {user: req.session.user});
    }

    async detalha(req, res) {
        res.render('detalha', {user: req.session.user, carta: cartaEncontrada[0]});
    }

    async edita(req, res) {
        
    }

    async cria(req, res) {
        
    }

    async login(req, res) {
        res.render('login');
    }
}

module.exports = { InicialController }