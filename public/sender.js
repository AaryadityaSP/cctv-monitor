const socket = io(); 
const localVideo = document.getElementById('localVideo'); 

const idPlaceholder = document.getElementById('id-placeholder');

let id ; 

socket.on('id', (gen_id)=>{
  id = gen_id;
  idPlaceholder.textContent = gen_id;
  console.log(id);
})


navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {

    localVideo.srcObject = stream;

    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs="vp8"' });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        reader.onloadend = () => {
          const buffer = new Uint8Array(reader.result);
          socket.emit('frame', buffer, id);
        };
      }
    };

    mediaRecorder.start(100);
  })
  .catch((error) => {
    console.error('Error accessing webcam:', error);
  });


