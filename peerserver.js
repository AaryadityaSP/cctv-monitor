const fs = require('fs');
const https = require('https');
const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

const server = https.createServer({
    key: fs.readFileSync(__dirname+'/certificates/server.key'),
    cert: fs.readFileSync(__dirname+'/certificates/server.crt')
}, app);

const peerServer = ExpressPeerServer(server, {
    path: '/'
});

app.use('/', peerServer);

server.listen(3001, () => {
    console.log('PeerJS server running on https://192.168.1.9:3001/');
});
