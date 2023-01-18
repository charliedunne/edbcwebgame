import { Server } from "socket.io"
import { createServer } from "http"

const httpServer = createServer()
const io = new Server(httpServer, {})

io.on("connection", (socket) => {
    console.log("Server connected")
})

httpServer.listen(3000);