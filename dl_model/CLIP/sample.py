from datetime import datetime
import pytz

# Define IST timezone
ist = pytz.timezone('Asia/Kolkata')

# Get the current time in IST
ist_time = datetime.now(ist)

# Print the IST time
print("Current time in IST:", ist_time.strftime('%H'))
