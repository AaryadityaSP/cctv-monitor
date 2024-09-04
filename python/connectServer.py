import asyncio
import websockets
import cv2
import numpy as np
from PIL import Image
import io
import base64
import json

# Dictionary to keep track of window names for each video stream
windows = {}

async def process_frame(websocket, path):
    async for message in websocket:
        # Parse the JSON message
        data = json.loads(message)
        stream_id = data['id']
        image_data = base64.b64decode(data['frame'].split(",")[1])
        
        # Convert the image data to an OpenCV format
        image = Image.open(io.BytesIO(image_data))
        open_cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        # Check if a window for this ID already exists
        if stream_id not in windows:
            windows[stream_id] = f'Video Frame - ID: {stream_id}'

        # Display the image in the corresponding window
        cv2.imshow(windows[stream_id], open_cv_image)

        # Check for 'q' key press to close all windows
        if cv2.waitKey(1) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            windows.clear()
            break

start_server = websockets.serve(process_frame, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
