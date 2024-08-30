const socket = io(); 

const videoDiv = document.getElementById('streams');
console.log(videoDiv);


socket.on('add video', (id)=>{
    const div = document.createElement('div');
    div.id = id;
    div.styles={backgroundColor:'lightblue', margin:'10px', padding:'10px'};
    div.textContent = id;
    videoDiv.appendChild(div)
})

socket.on('remove video',(id)=>{
    const div = document.getElementById(id);
    div.remove();
})



// const localVideo = document.getElementById('localVideo'); 
// const remoteVideo = document.getElementById('remoteVideo'); 


// const mediaSource = new MediaSource();
// remoteVideo.src = URL.createObjectURL(mediaSource);

// let sourceBuffer;


// mediaSource.addEventListener('sourceopen', () => {
//   sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
// });


// navigator.mediaDevices.getUserMedia({ video: true })
//   .then((stream) => {
//     localVideo.srcObject = stream;

//     const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8"' });


//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {

//         const reader = new FileReader();
//         reader.readAsArrayBuffer(event.data);
//         reader.onloadend = () => {

//           const buffer = new Uint8Array(reader.result);
//           socket.emit('frame', buffer);
//         };
//       }
//     };


//     mediaRecorder.start(100);
//   })
//   .catch((error) => {
//     console.error('Error accessing webcam:', error);
//   });


// socket.on('frame', (data) => {
//   if (sourceBuffer && !sourceBuffer.updating) {

//     sourceBuffer.appendBuffer(data);
//   }
// });
