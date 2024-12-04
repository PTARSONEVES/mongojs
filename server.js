require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user
    password: 'Strol!ndi!1', // A senha do usuário. Ex: user123
    database: 'itacoatiara2024'
});

conn.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Conexão estabelecida com o MySQL!')
});
/*
conn.query("SELECT id,observacoes FROM ct_artigos", (err, rows, fields) => {
    if (!err) {
        console.log("Resultado:", rows);
    } else {
        console.log('Erro: Consulta não realizada!');
    }
});
*/
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

