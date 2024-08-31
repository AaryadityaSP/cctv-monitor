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

let display_id = 0;

io.on('connection', (socket) => {
  let id = uuid();
  
  
  socket.on('display connect', ()=>{
    display_id = id;
    socket.emit('displayId', id);  //sending displayid to display client
    console.log(`display connected with id: ${id}`);
    socket.join('displayRoom');      //adding display client to a 'display' room
  })

  //sending unique id and display_id to sender...
  socket.emit('ids', {client_id: id, display_id}); 
  
  //sending to display client to make a new video element
  io.to('displayRoom').emit('add video', id); 
  
  //sending to display client to remove the video element
  socket.on('disconnect', () => {
    io.to('displayRoom').emit('remove video', id); 
  });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Todo
