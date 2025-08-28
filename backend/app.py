from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool
from typing import List
import io
from PIL import Image
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
import os


MODEL_PATH='../model.pt'
LABELS=['fake', 'real']

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

device=torch.device("cuda" if torch.cuda.is_available() else "cpu")

model=None
is_scripted=False

transform= transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5]*3, std=[0.5]*3)
])

class PredictionResponse(BaseModel):
    label: str
    score: float

@app.on_event("startup")
def load_model():

    global model,is_scripted

    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model file not found")
    
    try:
        model=torch.jit.load(MODEL_PATH,map_location=device)
        model.to(device)
        model.eval()
        is_scripted=True
        print(f"Loaded scripted model to {device}")
    except Exception:
        print("torch.jit.load failed")
        return

def preprocess_image(contents: bytes):
    try:
        img=Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise ValueError("Uploaded file is not a valid image")
    return transform(img).unsqueeze(0)

def run_inference(tensor: torch.Tensor):
    tensor=tensor.to(device)
    with torch.no_grad():
        out=model(tensor)
        if out.dim()==1:
            out=out.unsqueeze(0)
        probs=torch.softmax(out, dim=1)
        score, idx = torch.max(probs, dim=1)
        return idx.item(), float(score.item()), probs.cpu().numpy().tolist()
    
@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile=File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")
    contents = await file.read()
    try:
        tensor = preprocess_image(contents)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    try:
        idx, score, _probs = await run_in_threadpool(run_inference, tensor)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")

    label = LABELS[idx] if idx < len(LABELS) else str(idx)
    return PredictionResponse(label=label, score=score)
    
@app.get("/health")
def health():
    return {"status": "ok", "device": str(device), "scripted_model": is_scripted}
    

