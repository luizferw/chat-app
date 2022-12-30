import { io } from "socket.io-client"

const createSocketIOClient = () => ({
  install (app) {
    app.config.globalProperties.$socket = io(import.meta.env.VITE_API_ENDPOINT)
  }
})

export default createSocketIOClient()
