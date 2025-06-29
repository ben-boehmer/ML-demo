from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.routes import predict, chat, classify

app = FastAPI()

# ⬇️ CORS richtig setzen – das muss vor `include_router` geschehen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⬇️ Router einbinden
app.include_router(predict.router, prefix="/predict")
app.include_router(classify.router, prefix="/classify")
app.include_router(chat.router, prefix="/chat")

@app.get("/")
def read_root():
    return {"message": "Willkommen zur ML-Demo API"}
