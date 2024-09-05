import torch
import clip
from PIL import Image
import os 
import cv2
from ultralytics import YOLO
from PIL import Image
cap=cv2.VideoCapture(0)
device='mks'
#device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
#dir="/home/akshit/Desktop/CUHK/archive"
model_yolo=YOLO('yolov8n.pt')
# for file in os.listdir(dir):
while True:
    ret,frame=cap.read()
    if not ret:
        print('help')
        break
    results=model_yolo.predict(frame)
    
    result=results[0]
    count=0
    if len(result):
        for r in result:
            detection=r.boxes
            if detection.cls==0:
                count+=1
                # print(detection.xyxy)
                cv2.rectangle(frame,(int(detection.xyxy[0][0]),int(detection.xyxy[0][1])),(int(detection.xyxy[0][2]),int(detection.xyxy[0][3])),(0,255,0),3)
                # print(detection)
                frame=cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
                img=Image.fromarray(frame[int(detection.xyxy[0][1]):int(detection.xyxy[0][3]),int(detection.xyxy[0][0]):int(detection.xyxy[0][2])])
                image = preprocess(img).unsqueeze(0).to(device)
                text = clip.tokenize(["the image is of a male","the image is of a female"]).to(device)
                with torch.no_grad():
                    image_features = model.encode_image(image)
                    text_features = model.encode_text(text)
                    logits_per_image, logits_per_text = model(image, text)
                    probs = logits_per_image.softmax(dim=-1).cpu().numpy()
                cv2.putText(frame,"male" if probs[0][0]>probs[0][1] else "female",(int(detection.xyxy[0][1]),int(detection.xyxy[0][0])),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
                print("male" if probs[0][0]>probs[0][1] else "female")
    cv2.imshow('frame',cv2.cvtColor(frame,cv2.COLOR_RGB2BGR))
    print(count)
    k=cv2.waitKey(100)
    if k==ord('q'):
        break
cv2.destroyAllWindows()
    
    
    
    # path=os.path.join(dir,file)
    # print(path)

    # print("Label probs:", probs)  # prin`ts: [[0.9927937  0.00421068 0.00299572]]
