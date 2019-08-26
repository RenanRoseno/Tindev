const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}

io.on('connection' , socket => {
    const { user } = socket.handshake.query
    
    console.log(user, socket.id)

    connectedUsers[user] = socket.id
})

mongoose.connect('mongodb+srv://RosenoRenan:Jesuseaesperanca@cluster0-l47p8.mongodb.net/tindev?retryWrites=true&w=majority',
{
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers

    return next()
})
app.use(express.json())
app.use(cors())
app.use(routes) //Configurações de outros arquivos

server.listen(3030) // Criação de  um server   