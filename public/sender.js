const socket = io(); 

const localVideo = document.getElementById('localVideo'); 
const idPlaceholder = document.getElementById('id-placeholder');

//this event will be called as soon as this client connect to the socket io server.
socket.on('id', (id)=>{  

  let id_string = `cliend id: ${id}`;
  idPlaceholder.textContent = id_string;

  // creating a new client on Peer server with id that came from socket io server
  const peer = new Peer(id, {host:'/', port:'3001', secure: true});

  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia({video: true}, (stream)=> {
    localVideo.srcObject = stream;    //setting local video stream to video element
    peer.call('display', stream);     //calling display client with live local stream
  },
  (err)=> {
    console.log('Failed to get local stream' ,err);
  });
})


