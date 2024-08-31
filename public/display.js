const socket = io(); 

const videoDiv = document.getElementById('streams');
console.log(videoDiv);

let display_id;

let peer = new Peer('display', {host:'/', port:'3001'});

socket.emit('display connect');
socket.on('displayId', (id)=>{  //saving display_id
    display_id=id;
    console.log(display_id);
    
})

let videoElement = document.getElementById('video');

// socket.on('add video', (id)=>{
    // videoElement = document.createElement('video');
    // videoElement.id = id;
    // videoElement.autoplay = true;
    // videoElement.playsInline = true;
    // videoDiv.appendChild(videoElement);
// })

peer.on('call', function(call) {
    call.answer(null); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {

        videoElement.srcObject = remoteStream;
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true;

        console.log(videoElement);
        
        console.log(remoteStream);

        console.log('called');
    });
});




socket.on('remove video',(id)=>{
    const div = document.getElementById(id);
    div.remove();
})
