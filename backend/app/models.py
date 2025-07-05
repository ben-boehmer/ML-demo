from pydantic import BaseModel

class PredictInput(BaseModel):
    age: int
    years_worked: int

class ChatInput(BaseModel):
    prompt: str
