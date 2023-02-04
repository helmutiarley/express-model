require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Process ENV 
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectei à base de dados.')
        app.emit('ready');
    })
    .catch(e => console.log(e));

const routes = require('./routes')
const path = require('path');
const port = 3000;
const { middlewareGlobal } = require('./src/middlewares/middleware');
const { novoMiddlewareGlobal } = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Caminhos dos viwes
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middlewares globais
app.use(middlewareGlobal);
app.use(novoMiddlewareGlobal);
app.use(routes);

// Promise p/ conexão com banco de dados
app.on('ready', () => {
    app.listen(port, () => {
        console.log(`Servidor executando na porta: ${port}.`);
    });
});