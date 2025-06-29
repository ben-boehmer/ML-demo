from fastapi import APIRouter, Request
from app.ml_model.decision_tree_model import predict_retirement_age

router = APIRouter()

@router.post("")
async def predict(request: Request):
    data = await request.json()
    age = data.get("age")
    years_worked = data.get("years_worked")
    result = predict_retirement_age(age, years_worked)
    return {"result": result}
