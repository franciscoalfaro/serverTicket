const express = require('express');
const http = require('http');
const socketio = require("socket.io");
const Sockets = require('./sockets');
const cors = require('cors')


class Server{
    constructor(){
        this.app = express()
        this.port = 3000
        this.server = http.createServer(this.app);
        
        this.io = socketio(this.server)


        //inicializar socket
        this.sockets= new Sockets(this.io)

    }
    middlewares(){
        var corsOptions = {
            origin: 'http://localhost:5173',
            optionsSuccessStatus: 200
          }
        this.app.use(cors(corsOptions))

        this.app.get("/ultimos", (req, res) => {

            res.json({
                ultimos:this.sockets.ticketList.ultimosTrece
            });

        });

    }


    execute(){
        this.server.listen(this.port, () => {
            console.log(`holi Servidor en puerto : ${this.port}`);
          });

        this.middlewares()

    }


}
module.exports = Server;