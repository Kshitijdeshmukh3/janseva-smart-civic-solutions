from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)
res_health = client.get("/api/v1/health")
print("Health Status:", res_health.status_code, res_health.json())

res_schemes = client.get("/api/v1/schemes/")
print("Schemes Status:", res_schemes.status_code, "Count:", len(res_schemes.json()))

res_projects = client.get("/api/v1/projects/")
print("Projects Status:", res_projects.status_code, "Count:", len(res_projects.json()))

res_pstats = client.get("/api/v1/projects/stats")
print("Project Stats:", res_pstats.status_code, res_pstats.json())
