import pytest
import httpx
from app.main import app

@pytest.fixture
def anyio_backend():
    return 'asyncio'

@pytest.mark.anyio
async def test_root_endpoint():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "JANSEVA" in data["title"]

@pytest.mark.anyio
async def test_health_endpoint():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ONLINE"
        assert "DPDP" in data["security"]

@pytest.mark.anyio
async def test_list_organizations():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/api/v1/organizations/")
        assert response.status_code == 200
        orgs = response.json()
        assert len(orgs) >= 1
        assert any(o["code"] == "PMC" for o in orgs)

@pytest.mark.anyio
async def test_list_complaints():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/api/v1/complaints/")
        assert response.status_code == 200
        complaints = response.json()
        assert len(complaints) >= 1
        assert any("JS-2026" in c["complaint_number"] for c in complaints)

@pytest.mark.anyio
async def test_login_citizen():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.post("/api/v1/auth/login", json={
            "email": "citizen@janseva.in",
            "password": "Password123!"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["user"]["role"] == "CITIZEN"

@pytest.mark.anyio
async def test_nagarsevak_read_only_restriction():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        login_resp = await client.post("/api/v1/auth/login", json={
            "email": "nagarsevak.ward14@pmc.gov.in",
            "password": "Password123!"
        })
        assert login_resp.status_code == 200
        token = login_resp.json()["access_token"]

        patch_resp = await client.patch(
            "/api/v1/complaints/1/status",
            headers={"Authorization": f"Bearer {token}"},
            json={"status": "RESOLVED"}
        )
        assert patch_resp.status_code == 403
        assert "READ-ONLY" in patch_resp.json()["detail"]
