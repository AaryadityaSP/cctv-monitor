import asyncio
import websockets
import cv2
import numpy as np
from PIL import Image
import io
import base64
import json

async def process_frame(websocket, path):
    async for message in websocket:
        # Parse the JSON message
        data = json.loads(message)
        id = data['id']
        image_data = base64.b64decode(data['frame'].split(",")[1])
        
        # Log the ID
        print(f"Received frame from ID: {id}")

        # Convert the image data to an OpenCV format
        image = Image.open(io.BytesIO(image_data))
        open_cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        # Display the image
        cv2.imshow(f'Video Frame - ID: {id}', open_cv_image)

        # Break the loop if 'q' key is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            break

start_server = websockets.serve(process_frame, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
