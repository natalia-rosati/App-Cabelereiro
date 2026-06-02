//npm i express
const express = require('express')
const router = require('./mvc/routes/config')

class Server
{

    app 
    port

    constructor(port)
    {
        this.app = express()
        this.port = port
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.set("view engine", "ejs")
        this.app.set("views","mvc/views")
        this.app.use(router)

    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log("Servidor Online...")
        })
    }

}

module.exports = new Server(3000)