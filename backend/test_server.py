import subprocess
import time
import urllib.request
import json
import sys

print("Starting Uvicorn server on port 8000...", flush=True)
proc = subprocess.Popen(
    [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

try:
    # Wait for server to bind
    time.sleep(3)

    # 1. Root
    with urllib.request.urlopen("http://127.0.0.1:8000/") as response:
        data = json.loads(response.read().decode())
        print("1. Root Endpoint:", data["title"], flush=True)

    # 2. Health
    with urllib.request.urlopen("http://127.0.0.1:8000/api/v1/health") as response:
        data = json.loads(response.read().decode())
        print("2. Health Status:", data["status"], "| Database:", data["database"], flush=True)

    # 3. Organizations
    with urllib.request.urlopen("http://127.0.0.1:8000/api/v1/organizations/") as response:
        data = json.loads(response.read().decode())
        print("3. Organizations:", len(data), "Active tenants found", flush=True)

    # 4. Complaints
    with urllib.request.urlopen("http://127.0.0.1:8000/api/v1/complaints/") as response:
        data = json.loads(response.read().decode())
        print("4. Complaints:", len(data), "Seeded complaints retrieved", flush=True)

    print("\n[SUCCESS] FASTAPI SERVER RUNNING AND FULLY FUNCTIONAL!", flush=True)

finally:
    proc.terminate()
    proc.wait()
