const { getData, removeData } = require("./db/dbfuctions");

function onConnect(socket) {
    let id;

    //sending unique id to sender...
    socket.on('client-id', (clientId)=>{
        id=clientId;
    });

    socket.on('alert', id => {
        console.log('alert on id', id);
        console.log('details:', getData(id));
    });

    socket.on('display connect', () => {
        socket.join('displayRoom');      //adding display client to a 'display' room
    })

    //sending to display client to remove the video element
    socket.on('disconnect', () => {
        socket.to('displayRoom').emit('remove video', id);
        removeData(id);
    });
}

module.exports = onConnect;