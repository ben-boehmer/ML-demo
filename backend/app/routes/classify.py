# app/routes/classify.py

from fastapi import APIRouter, UploadFile, File
from app.ml_model import classify_model

router = APIRouter()

@router.post("/")
async def classify_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    label = classify_model.classify_image(image_bytes)
    return {"label": label}
