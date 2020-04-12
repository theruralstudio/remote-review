const io = require('socket.io')(server)

io.on('connect', socket => {
  socket.emit('now', {
    message: 'zeit'
  })
})