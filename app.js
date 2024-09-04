require('dotenv').config();
const express = require('express');
const https = require('https');
const http = require('node:http');
const fs = require('fs');
const socketIO = require('socket.io');

const adminRouter = require('./routes/adminRouter');
const senderRouter = require('./routes/senderRouter');
const onConnect = require('./socketOnConnect');

const options = {
  key: fs.readFileSync(__dirname+'/certificates/server.key'),
  cert: fs.readFileSync(__dirname+'/certificates/server.crt')
};


const app = express();
let server ; 
if(process.env.server=='https')
  server = https.createServer(options ,app);
else if(process.env.server='http')
  server = http.createServer(app); 

const io = socketIO(server);

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
  res.send('this is homepage');
})


app.use('/sender', senderRouter);
app.use('/admin', adminRouter);


io.on('connection', onConnect);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});