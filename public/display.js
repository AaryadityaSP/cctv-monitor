const socket = io(); 
let peer = new Peer('display', {host:'/', port:'3001', secure: true});

const videoContainer = document.getElementById('streams');

socket.emit('display connect');

peer.on('call', function(call) {
    call.answer(null);

    call.on('stream', function(remoteStream) {
        let id = call.peer;
        const videoDiv = createVideoDiv(remoteStream, id);
        videoContainer.appendChild(videoDiv);
    });

});

socket.on('remove video', (id)=>{
    document.getElementById(id).remove();
})




function createVideoDiv (stream, id){
    const videoDiv = document.createElement('div');
    videoDiv.id = id;
    const videoElement = createVideoElement(stream);
    const alertBtn = createAlertBtn(id);
    videoDiv.appendChild(videoElement);
    videoDiv.appendChild(alertBtn);
    return videoDiv;
}

function createVideoElement(stream){
    let videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    return videoElement
}

function createAlertBtn(id){
    let alertBtn = document.createElement('button');
    alertBtn.textContent= 'alert'
    alertBtn.addEventListener('click', ()=>{
        socket.emit('alert', id);
    })
    return alertBtn;
}