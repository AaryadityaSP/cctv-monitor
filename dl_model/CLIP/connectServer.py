import asyncio
import websockets
import cv2
import numpy as np
from PIL import Image
import io
import base64
import json
import ssl
import pathlib
from test_frame import infer
import sys
import socketio
import engineio
import torch
from datetime import datetime
import pytz
import clip
from PIL import Image
import os 
import cv2
from ultralytics import YOLO
from PIL import Image
ist=pytz.timezone('Asia/Kolkata')
# cap=cv2.VideoCapture(0)
device = "mps"


sys.path.append('/Users/aman/Desktop/socket/dl_model/CLIP')


sio = socketio.Client(ssl_verify=False)

@sio.event
def connect():
    print('connected')






async def process_frame(websocket, path):
    global sio
    async for message in websocket:
        # Parse the JSON message
        data = json.loads(message)
        id = data['id']
        image_data = base64.b64decode(data['frame'].split(",")[1])      
        # Log the/home/akshit/Desktop/cctv-monitor/python IDs
        print(f"Received frame from ID: {id}")
        # Convert the image data to an OpenCV format
        image = Image.open(io.BytesIO(image_data))
        open_cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        print(infer(open_cv_image,sio,id))
        # sio.emit('alert','fuck off')
        # Display the images
        # cv2.imshow(f'Video Frame - ID: {id}', open_cv_image)
        # Break the loop if 'q' key is pressed

        if cv2.waitKey(1) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            break

start_server = websockets.serve(process_frame, "localhost", 8765)
# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain(certfile="certificates/server.crt", keyfile="certificates/server.key")
sio.connect('https://localhost:3000', transports=['websocket'])


asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
