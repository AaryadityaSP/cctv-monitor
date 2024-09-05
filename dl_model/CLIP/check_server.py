import asyncio
import websockets

async def check_websocket():
    uri = "wss://localhost:8765"
    try:
        async with websockets.connect(uri) as websocket:
            print(f"Connected to {uri}")
            # Optionally, send a message
            await websocket.send("Test message")
            response = await websocket.recv()
            print(f"Received: {response}")
    except Exception as e:
        print(f"Failed to connect to {uri}: {e}")

asyncio.get_event_loop().run_until_complete(check_websocket())
