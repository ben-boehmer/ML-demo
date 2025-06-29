# app/routes/chat.py

from fastapi import APIRouter, Request
from pydantic import BaseModel
from app.ml_model import chat_model

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str

@router.post("/")
async def chat_with_bot(request: ChatRequest):
    response = chat_model.respond(request.prompt)
    return {"response": response}
