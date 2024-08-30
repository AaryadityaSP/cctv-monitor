const express = require('express');
const http = require('node:http');
const socketIO = require('socket.io');
const uuid = require('uuid').v4;


const app = express();
const server = http.createServer( app);
const io = socketIO(server);



app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.send('hehe this is homepage');
})

io.on('connection', (socket) => {
  let id = uuid();
  console.log(`user with id: ${id} connected`);

  socket.emit('id', id); //sending unique id to sender...
  
  socket.broadcast.emit('add video', id);//sending to display client to make a new video element
  
  
  socket.on('frame', (data, id) => {
    
  });

  socket.on('disconnect', () => {
    console.log(`user with id: ${id} disconnected`);
    socket.broadcast.emit('remove video', id); //sending to display client to remove the video element
  });
});




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Todo
// 1. instead of emiting on all users try to send to specfic /display route users 
