import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import 'dotenv/config'

const app = express()
app.use(cors())

const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening on http://localhost:' + process.env.ORT)
})

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ENDPOINT
  }
})

const messages = {}

io.on('connection', socket => {
  console.log('Socket ID: ' + socket.id)

  socket.on('join-room', room => {
    console.log('Joined room: ' + room)
    socket.join(room)
    io.sockets.to(socket.id).emit('receive-message', messages[room] ?? [])
  })

  socket.on('send-message', data => {
    const dto = {
      author: data.author,
      text: data.text,
      userId: data.userId
    }
    if (!messages[data.room]) {
      messages[data.room] = []
    }
    messages[data.room].push(dto)
    io.sockets.to(data.room).emit('receive-message', [dto])
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
})
