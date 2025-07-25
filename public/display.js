const socket = io(); 
// creating a new client on Peer server with 'display' as id.
let peer = new Peer('display', { host: '/', port: '3001', secure: true });

const videoContainer = document.getElementById('streams');

//this event is called so that this socket(client) can be added to displayRoom in socket io server 
// we will emit 'remove video' to this room to remove the video element of disconnected /sender client
socket.emit('display connect');

//answer the call from /sender client
peer.on('call', function(call) {
    call.answer(null);

    call.on('stream', function (remoteStream) {
        
        const socket = new WebSocket('ws://localhost:8765');
        
        let id = call.peer;
        const videoDiv = createVideoDiv(remoteStream, id);
        const video = videoDiv.querySelector('video');

        socket.onopen = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            function sendFrame() {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const dataURL = canvas.toDataURL('image/jpeg');
                    const message = JSON.stringify({ id: id, frame: dataURL });
                    socket.send(message);
                }
                setTimeout(sendFrame, 1000);
            }
            sendFrame();
        };

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
    videoDiv.classList.add('videoDiv');


    let videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    
    const idPara = document.createElement('p');
    idPara.textContent = `Camera id : ${id}`;
    let alertBtn = document.createElement('button');

    alertBtn.textContent= ' '
    alertBtn.addEventListener('click', ()=>{
        // sends the 'alert' event on the socket server with id of video
        socket.emit('alert', id);
    })

    idPara.appendChild(alertBtn)
    videoDiv.appendChild(videoElement);
    videoDiv.appendChild(idPara);

    return videoDiv;
}