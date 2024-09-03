const socket = io(); 
// creating a new client on Peer server with 'display' as id.
let peer = new Peer('display', {host:'/', port:'3001'});

const videoContainer = document.getElementById('streams');

//this event is called so that this socket(client) can be added to displayRoom in socket io server 
// we will emit 'remove video' to this room to remove the video element of disconnected /sender client
socket.emit('display connect');

//answer the call from /sender client
peer.on('call', function(call) {
    call.answer(null);

    call.on('stream', function(remoteStream) {
        let id = call.peer;
        const videoDiv = createVideoDiv(remoteStream, id);
        videoContainer.appendChild(videoDiv);
    });

});

// the remove video that we taked about above
socket.on('remove video', (id)=>{
    document.getElementById(id).remove();
})




function createVideoDiv (stream, id){
    const videoDiv = document.createElement('div');
    videoDiv.id = id;

    let videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    
    let alertBtn = document.createElement('button');
    alertBtn.textContent= 'alert'
    alertBtn.addEventListener('click', ()=>{
        // sends the 'alert' event on the socket server with id of video
        socket.emit('alert', id);
    })
    
    videoDiv.appendChild(videoElement);
    videoDiv.appendChild(alertBtn);

    return videoDiv;
}