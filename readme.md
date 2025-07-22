# 🛡️ ikSHEna - AI-Powered Women Safety Surveillance System

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=13qa7GewTvJkqsH4Bqo-BYrBUcyQszF4r" height="300"/>
</p>


`ikSHEna` is an AI-driven surveillance platform that transforms existing CCTV networks into intelligent real-time women safety monitoring systems. It detects threats using advanced ML models and notifies authorities for rapid response — all with minimal hardware changes.

---

## 🚀 Project Overview

Violence and harassment against women remain a major societal challenge. **ikSHEna** aims to proactively **detect danger signals from real-time CCTV feeds** and enable authorities to intervene **before a crime happens**.

> 📍 "An extra set of AI-powered eyes watching over women safety."

---

## 🎯 Key Features

- 🔍 **Human Detection**: Identifies people in CCTV footage using Region of Interest (RoI) extraction.
- 🧠 **Gender Classification**: Detects whether the person is female.
- 🧍‍♀️ **Pose Estimation**: Recognizes distress gestures (e.g., SOS signals).
- ⏱ **Temporal Monitoring**: Tracks behavior over time for consistent alerts.
- 🌐 **Admin Dashboard**:
  - Live CCTV Feed View
  - Add/Remove cameras
  - Auto-geotagging & camera details
- 🚨 **Alert System**: Notifies local authorities upon threat detection.
- 🔒 **Privacy by Design**: No recording or storing personal data.

---

## 🏗️ System Architecture

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1BcdlorR859rnMTcKv9MI4rtakDQdm7Ru" height="300"/>
</p>

## ⚙️ Tech Stack

| **Layer**          | **Technology**                               |
| ------------------ | -------------------------------------------- |
| **Frontend**       | HTML + TailwindCSS + Vanilla JS              |
| **Backend**        | Node.js (Express) + Socket.IO                |
| **ML Inference**   | Python (YOLOv8, CLIP) via Flask or FastAPI   |
| **Real-time Comm** | PeerJS + WebRTC                              |
| **Messaging**      | Telegram Bot API                             |
| **Database**       | LocalStorage                                 |
| **Security**       | HTTPS (SSL Certificates) + dotenv for config |

---

## 🚀 Getting Started

### 1. Prerequisites

* Node.js & npm

```bash
node -v
npm -v
```

If not installed, install from: [https://nodejs.org/en/download](https://nodejs.org/en/download)

* Python (3.7+)

```bash
python --version
```

* Virtual Environment (optional but recommended for ML part)

---

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/ikshena.git
cd ikshena
```

---

### 3. Setup Frontend + Backend

```bash
cd client         # Frontend
npm install

cd ../server      # Backend (Node.js)
npm install
```

---

### 4. Start Servers

**Frontend (Client)**

```bash
cd client
npm run dev
```

**Backend (Socket & API Server)**

```bash
cd ../server
node index.js
```

---

### 5. Setup ML Inference Server

```bash
cd ml_model
python3 -m venv venv
source venv/bin/activate        # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

---

### 6. Add CCTV Cameras

* Visit the **admin dashboard** (localhost:5173 or similar)
* Register a new camera with its **IP Address**
* Each camera gets an auto-generated **ID**
* Streams start being monitored

---

### 7. Connect Telegram Bot

* Create a bot from [BotFather](https://t.me/BotFather)
* Add token to `.env` file in `server/`

```env
TELEGRAM_BOT_TOKEN=your_bot_token
CHAT_ID=your_group_or_user_id
```

---

## 💡 How it Works (Workflow)

1. Cameras are registered via admin panel with their addresses.
2. Each camera is assigned a unique ID and stream data.
3. Stream is sent to:

   * **ML Server** (for inference: gender, gestures)
   * **Socket Server** (for admin dashboard display)
4. Alerts (if detected) are pushed to **Telegram**.
5. Admin sees all streams and alerts in real-time.

---

## 🛠️ Future Scope

* Integration with emergency response systems
* Centralized cloud storage for evidence
* Improved ML models with higher precision
* Multi-language UI support

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork the repo and create a new branch for your feature or bugfix.

---

## 📬 Contact

For queries, collaborations or demos:
📧 [aaryaditya.work@gmail.com](mailto:aaryaditya.work@gmail.com)
📞 +91-9968610888
