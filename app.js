const express = require('express');
const https = require('https');
const fs = require('fs');
const socketIO = require('socket.io');
const uuid = require('uuid').v4;


const options = {
  key: fs.readFileSync(__dirname+'/certificates/server.key'),
  cert: fs.readFileSync(__dirname+'/certificates/server.crt')
};


const app = express();
const server = https.createServer(options ,app);
const io = socketIO(server);




app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.send('hehe this is homepage');
})


io.on('connection', (socket) => {
  let id = uuid();
  
  
  socket.on('display connect', ()=>{
    socket.join('displayRoom');      //adding display client to a 'display' room
  })

  //sending unique id to sender...
  socket.emit('id', id); 
  
  //sending to display client to remove the video element
  socket.on('disconnect', () => {
    io.to('displayRoom').emit('remove video', id); 
  });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


