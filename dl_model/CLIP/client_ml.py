import socketio
import sys
sys.path.append('/home/akshit/peerjs-python/src/')
sys.path.append('/home/akshit/peerjs-python/src/peerjs')
from peerjs.peer import Peer

# Initialize a Socket.IO client
sio = socketio.Client()

# Create a Peer instance with 'display' as ID
peer = Peer(id='display',host='192.168.1.115' ,port=3001)
print(peer)
# Event handler for Socket.IO connection
@sio.event
def connect():
    print('Connected to Socket.IO server')
    sio.emit('display connect')  # Emit 'display connect' to join the displayRoom

# Event handler for removing video
@sio.on('remove video')
def remove_video(data):
    stream_id = data['id']
    print(f'Removing stream: {stream_id}')
    # Implement the logic to handle stream removal, e.g., stop processing it

# Event handler for receiving calls from sender clients
def on_call(call):
    print(f'Received a call from: {call.peer}')
    call.answer(None)  # Answer the call without sending any media

    def on_stream(remote_stream):
        print(f'Received a stream from {call.peer}')
        # Implement the logic to process the remote stream here

    call.on('stream', on_stream)

# Set up the event handler for incoming calls
peer.on('call', on_call)

# Connect to the Socket.IO server
sio.connect('http://192.168.1.115:3000')  # Replace with your server's URL

# Keep the script running
sio.wait()