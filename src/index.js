
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');

// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true
}));

// PARSER DAS REQUISIÇOES COM JSON
app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: ":) segredo",
    resave: false, //NAO SOBRESCREVER CASO NAO HAJA MODIFICACOES   
    saveUninitialized: false,
    cookie: { secure: false }
}));



app.use(express.static('public'));




const cardsRoutes = require('./routes/cards-routes');
app.use('/cards', cardsRoutes);

const usersRoutes = require('./routes/users-routes');
app.use('/', usersRoutes)

app.use('*', (req, res) => {
    return res.redirect('/index');
})

app.listen(3000, () => console.log('Server iniciado na porta 3000'));