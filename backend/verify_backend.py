import asyncio
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import httpx
from app.main import app

async def run_tests():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        print("1. Testing Root endpoint...")
        r = await client.get("/")
        assert r.status_code == 200, f"Root failed: {r.status_code}"
        assert "JANSEVA" in r.json()["title"]
        print("   ✓ Root endpoint OK")

        print("2. Testing Health check...")
        r = await client.get("/api/v1/health")
        assert r.status_code == 200, f"Health failed: {r.status_code}"
        assert r.json()["status"] == "ONLINE"
        print("   ✓ Health check OK (Database & DPDP)")

        print("3. Testing Organizations list...")
        r = await client.get("/api/v1/organizations/")
        assert r.status_code == 200
        orgs = r.json()
        assert len(orgs) >= 1
        print(f"   ✓ Organizations OK ({len(orgs)} active municipal corporations)")

        print("4. Testing Complaints list...")
        r = await client.get("/api/v1/complaints/")
        assert r.status_code == 200
        complaints = r.json()
        assert len(complaints) >= 1
        print(f"   ✓ Complaints OK ({len(complaints)} seeded complaints)")

        print("5. Testing Authentication & JWT issuance (Citizen role)...")
        r = await client.post("/api/v1/auth/login", json={
            "email": "citizen@janseva.in",
            "password": "Password123!"
        })
        assert r.status_code == 200
        data = r.json()
        assert "access_token" in data
        assert data["user"]["role"] == "CITIZEN"
        print("   ✓ Citizen login OK, JWT token issued")

        print("6. Testing Nagar Sevak READ-ONLY restriction enforcement...")
        login_r = await client.post("/api/v1/auth/login", json={
            "email": "nagarsevak.ward14@pmc.gov.in",
            "password": "Password123!"
        })
        assert login_r.status_code == 200
        token = login_r.json()["access_token"]

        patch_r = await client.patch(
            "/api/v1/complaints/1/status",
            headers={"Authorization": f"Bearer {token}"},
            json={"status": "RESOLVED"}
        )
        assert patch_r.status_code == 403, f"Expected 403 Forbidden, got {patch_r.status_code}"
        assert "READ-ONLY" in patch_r.json()["detail"]
        print("   ✓ Nagar Sevak READ-ONLY restriction successfully verified (403 Forbidden on status mutation)")

        print("7. Testing Development Projects list...")
        r = await client.get("/api/v1/projects/")
        assert r.status_code == 200
        projs = r.json()
        assert len(projs) >= 1
        print(f"   ✓ Development Projects OK ({projs[0]['title']}, Budget: ₹{projs[0]['approved_budget']:,})")

        print("8. Testing DPDP Act 2023 Consent retrieval...")
        citizen_token = data["access_token"]
        consents_r = await client.get(
            "/api/v1/privacy/consents",
            headers={"Authorization": f"Bearer {citizen_token}"}
        )
        assert consents_r.status_code == 200
        consents = consents_r.json()
        assert len(consents) >= 5
        print(f"   ✓ DPDP 2023 Consents OK ({len(consents)} consent categories tracked)")

    print("\n🎉 ALL BACKEND ENDPOINTS AND SECURITY CHECKS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(run_tests())
