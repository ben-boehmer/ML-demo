import pytest
from httpx import AsyncClient
from app.main import app
from pathlib import Path
from httpx import ASGITransport

@pytest.mark.asyncio
async def test_classify():
    test_image = Path(__file__).parent / "test_image.jpg"
    if not test_image.exists():
        pytest.skip("Testbild fehlt.")
    
    with test_image.open("rb") as f:
        files = {"file": ("test_image.jpg", f, "image/jpeg")}
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            response = await ac.post("/classify/", files=files)

    assert response.status_code == 200
    assert response.json()["label"] in ["Hund", "Katze", "Nichts"]
