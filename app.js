const express = require('express');
const https = require('https');
const fs = require('fs');
const socketIO = require('socket.io');

const adminRouter = require('./routes/adminRouter');
const onConnect = require('./socketServer');

const options = {
  key: fs.readFileSync(__dirname+'/certificates/server.key'),
  cert: fs.readFileSync(__dirname+'/certificates/server.crt')
};


const app = express();
const server = https.createServer(options ,app);
const io = socketIO(server);

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
  res.send('hehe this is homepage');
})

app.get('/sender', (req, res)=>{
  res.render('sender');
})

app.use('/admin', adminRouter);


io.on('connection', onConnect);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});