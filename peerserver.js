require('dotenv').config();
const http = require('node:http');
const fs = require('fs');
const https = require('https');
const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

const options = {
    key: fs.readFileSync(__dirname + '/certificates/server.key'),
    cert: fs.readFileSync(__dirname + '/certificates/server.crt')
};

let server
if (process.env.server == 'https')
    server = https.createServer(options, app);
else if (process.env.server = 'http')
    server = http.createServer(app);


const peerServer = ExpressPeerServer(server, {
    path: '/'
});

app.use('/', peerServer);

server.listen(3001, () => {
    console.log('PeerJS server running on https://localhost:3001/');
});
