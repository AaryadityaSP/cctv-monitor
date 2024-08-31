const socket = io(); 
const localVideo = document.getElementById('localVideo'); 

const idPlaceholder = document.getElementById('id-placeholder');


socket.on('id', (id)=>{

  let id_string = `cliend id: ${id}`;
  idPlaceholder.textContent = id_string;

  const peer = new Peer(id, {host:'/', port:'3001'});

  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia({video: true}, (stream)=> {
    localVideo.srcObject = stream;    //setting local video stream to video element
    peer.call('display', stream);

  },
  (err)=> {
    console.log('Failed to get local stream' ,err);
  });
})


