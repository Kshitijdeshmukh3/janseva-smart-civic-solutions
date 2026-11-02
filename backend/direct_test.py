import sys
sys.stdout.reconfigure(encoding='utf-8')
from app.database import SessionLocal
from app.routers.schemes import list_schemes
from app.routers.projects import list_projects, project_stats
from app.routers.complaints import list_complaints

db = SessionLocal()
try:
    schemes = list_schemes(db=db)
    print("SCHEMES COUNT:", len(schemes))
    for s in schemes[:3]:
        print("  - [Scheme]:", s["scheme_code"], "|", s["title"], "| Assistance:", s["financial_assistance"])
    
    projects = list_projects(db=db)
    print("PROJECTS COUNT:", len(projects))
    for p in projects:
        print("  - [Project]:", p["project_code"], "|", p["title"], "| Progress:", f"{p['progress_percentage']}%")
    
    stats = project_stats(db=db)
    print("PROJECT STATS:", stats)
finally:
    db.close()
