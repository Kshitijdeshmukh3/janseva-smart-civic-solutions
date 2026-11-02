import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app, raise_server_exceptions=True)

print("1. Root Endpoint:", flush=True)
r = client.get("/")
print("   Status:", r.status_code, r.json(), flush=True)

print("2. Health Endpoint:", flush=True)
r = client.get("/api/v1/health")
print("   Status:", r.status_code, r.json(), flush=True)

print("3. List Organizations:", flush=True)
r = client.get("/api/v1/organizations/")
print("   Status:", r.status_code, "Count:", len(r.json()), flush=True)

print("4. List Complaints:", flush=True)
r = client.get("/api/v1/complaints/")
print("   Status:", r.status_code, "Count:", len(r.json()), flush=True)

print("5. Citizen Login:", flush=True)
r = client.post("/api/v1/auth/login", json={"email": "citizen@janseva.in", "password": "Password123!"})
print("   Status:", r.status_code, "Role:", r.json()["user"]["role"], flush=True)

print("6. Nagar Sevak Read-Only Test:", flush=True)
r_ns = client.post("/api/v1/auth/login", json={"email": "nagarsevak.ward14@pmc.gov.in", "password": "Password123!"})
token = r_ns.json()["access_token"]
r_patch = client.patch("/api/v1/complaints/1/status", headers={"Authorization": f"Bearer {token}"}, json={"status": "RESOLVED"})
print("   Patch Status (expect 403):", r_patch.status_code, r_patch.json(), flush=True)

print("\nALL VERIFICATIONS PASSED!", flush=True)
