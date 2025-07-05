import pytest
from httpx import AsyncClient
from app.main import app
from httpx import ASGITransport


@pytest.mark.asyncio
async def test_chat():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {"prompt": "Wer ist Benjamin?"}
        response = await ac.post("/chat/", json=payload)
    assert response.status_code == 200
    assert "response" in response.json()
