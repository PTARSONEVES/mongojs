require('dotenv').config();
const express = require('express');
const app = express();
const mongoose =  require('mongoose');
mongoose.connect(process.env.CONNECTIONAGENDA)
    .then(() => {
        console.log('Conectado à base de dados!');
        app.emit('pronto');
    })
    .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const port = 3000;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'vlaoihfgmnvjhsdytgvclooiugnmnskk a6()',
    store: MongoStore.create({ 
        mongooseConnection: mongoose.connection,
        mongoUrl: process.env.CONNECTIONAGENDA}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
   app.listen(port, () => {
        console.log('Home: http://localhost:'+port.toString());
        console.log('Servidor rodando na porta '+port.toString());
    }); 
});
