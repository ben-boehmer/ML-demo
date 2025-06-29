import pytest
import httpx
from app.main import app
from httpx import ASGITransport

@pytest.mark.asyncio
async def test_predict():
    transport = ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {"age": 60, "years_worked": 35}
        response = await ac.post("/predict", json=payload)
    assert response.status_code == 200
    assert response.json()["result"].lower() in ["ja", "nein"]