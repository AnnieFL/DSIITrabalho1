const { nanoid, random } = require('nanoid');

const users = require('../json/users.json').Usuarios;

class UsersController {
    async index(req, res) {
        const {por} = req.query;

        //ORGANIZA USUARIOS
        if (por == "nomeAsc") {
            users.sort((a, b) => {
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
        } else if (por == "nomeDesc") {
            users.sort((a, b) => {
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
            users.sort((a, b) => a.data - b.data);
        } else {
            //DEFAULT
            users.sort((a, b) => b.data - a.data);
        }

        if (req.session.user) {
            //USUARIO LOGADO NÃO APARECE NA LISTA DE USERS
            const outrosUsers = users.filter(u => u.id != req.session.user.id);
            return res.render('inicio', { user: req.session.user, outrosUsers:outrosUsers});
        }
        return res.render('inicio', { user: req.session.user, outrosUsers:users});
    }

    async cadastrar(req, res) {

        //EVITA INFORMAÇÕES EM BRANCO
        if (!(req.body.nome == "" || req.body.email=="" || req.body.senha == "" || req.body.dark == "")) {
        
            //EVITA EMAILS REPETIDOS
            if (!users.find(u => u.email == req.body.email)) {

                req.body.admin = false;
                req.body.id = nanoid(8);
                
                //CRIA DATA NA FORMA DE AAAAMMDD
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
        } else {
        //CASO HAJA INFORMAÇÕES EM BRANCO
        return res.send(`<body>
        <h1 style='text-align:center;'>Email já em uso</h1>
        <script>
            setTimeout(() => {window.location.href('/')}, 3000);
        </script>
        </body>`); 
        }} else {
            return res.send(`<body>
            <h1 style='text-align:center;'>Informação faltando. Por favor preencha tudo</h1>
            <script>
                setTimeout(() => {window.location.href('/')}, 3000);
            </script>
            </body>`);            
        }
    }

    async login(req, res) {
        //ACHAR O EMAIL
        const {email, senha} = req.body;
        const usuarioEncontrado = users.find(u => u.email == email);

        if (!usuarioEncontrado) {
            return res.send(`<body>
            <h1 style='text-align:center;'>Senha e Email não conferem!</h1>
            <script>
                setTimeout(() => {window.location.href('/')}, 3000);
            </script>
            </body>`);  
        }
        
        //VERIFICA SENHA
        if (usuarioEncontrado.senha == senha) {
            req.session.user = usuarioEncontrado;
            res.redirect('/');
        } else {
            return res.send(`<body>
            <h1 style='text-align:center;'>Senha e Email não conferem!</h1>
            <script>
                setTimeout(() => {window.location.href('/')}, 3000);
            </script>
            </body>`);  
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

    async bonus(req, res) {
        //PEGA A CARTA ALEATORIA GERADA EM cardsController.bonus E ADICIONA AO "BANCO"
        const {id} = req.session.user;

        for (let i = 0; i<users.length; i++) {
            if (users[i].id = req.session.user) {
                users[i].cartas = req.session.user.cartas;
                return res.redirect('/');
            }
        }
        return res.redirect('/cards/lista');
    }
}

module.exports = {UsersController};
