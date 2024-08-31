const socket = io(); 
let peer = new Peer('display', {host:'/', port:'3001'});

const videoDiv = document.getElementById('streams');

socket.emit('display connect');

peer.on('call', function(call) {
    call.answer(null);
    
    call.on('stream', function(remoteStream) {

        let videoElement = document.createElement('video');
        videoElement.id = call.peer;
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.muted = true;
        videoElement.srcObject = remoteStream;

        videoDiv.appendChild(videoElement);
        
    });

});

socket.on('remove video', (id)=>{
    document.getElementById(id).remove();
})
