const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const path =  require('path');
const routes = require('./routes')
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const oi = socketio(server);

mongoose.connect('mongodb+srv://jaksonsneider:Jakson@9987@omnistack-loadn.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

oi.on('connection', (socket) => {
    const { user_id } = socket.handshake.query;

    connectionUsers[user_id] = socket.id;
    // console.log('Loga User' , socket.id);
    // setTimeout(() => {
    //     // socket.on();
    //     socket.emit('Hello', 'Word');
    // }, 4000);
});

app.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers;

    return next;
});

// (REQ, RES) = REQ => pegar parametros url
// (REQ, RES) = RES => devolver responta cliente 'JSON'

// req.query = Acessar query params ( para filtros )
// req.params = Acessar route params ( para edição , delete )
// req.body = Acessar corpo da requisição ( para criação, edição )

 // trazer - criar - editar - deletar
// GET, POS, PUT, DELETE
// app.use(cors({ origin: 'kep.web'}));

app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);

server.listen(3333);