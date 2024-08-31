const socket = io(); 
const localVideo = document.getElementById('localVideo'); 

const idPlaceholder = document.getElementById('id-placeholder');

let ids = {};

socket.on('ids', (ids_com)=>{

  ids = ids_com;
  let id_string = `cliend id: ${ids.client_id}<br/> display_id: ${ids.display_id}`;
  idPlaceholder.innerHTML = id_string;

  const peer = new Peer(ids.client_id, {host:'/', port:'3001'});

  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia({video: true}, function(stream) {
    localVideo.srcObject = stream; //setting local video stream to video element
    var call = peer.call('display', stream);

  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
  



})


