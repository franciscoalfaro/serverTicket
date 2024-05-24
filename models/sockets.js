
const TicketList = require ('./ticket-list')

class Sockets {

    constructor(io) {
        this.io = io;

        this.ticketList = new TicketList()

        this.socketEvents()

    }

    socketEvents() {
        //conexion 
        this.io.on('connection', (socket) => {

            console.log('cliente conectado')
           

            socket.on('solicitar-ticket', (data, callback)=>{
                const nuevoTicket = this.ticketList.crearTicket()
                callback(nuevoTicket)
           
               console.log(nuevoTicket,data)
            })

            socket.on('siguiente-ticket', ({agente,escritorio}, callback)=>{
                const siguientTicket = this.ticketList.asignarTicket(agente,escritorio)
                callback(siguientTicket)

                this.io.emit('ticket-asignado', this.ticketList.ultimosTrece)
            })


            socket.on('disconnect', () => {
                console.log('Usuario desconectado');

            });
        });


    }

}
module.exports = Sockets;