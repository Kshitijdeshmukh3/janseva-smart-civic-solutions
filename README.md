<<<<<<< HEAD
# JANSEVA – SMART CIVIC SOLUTIONS

> **"Your Area. Your Voice. Our Responsibility."**

**JANSEVA** is an enterprise-grade, multi-tenant Smart Municipal Governance, Citizen Engagement, AI Photo Verification, Government Welfare Schemes, and Area Development Platform. Built with **React.js, Progressive Web App (PWA) architecture, Python FastAPI, SQLAlchemy, and MySQL**.

Designed with a modern, high-contrast, light enterprise dashboard visual system inspired by executive SaaS standards, utilizing a rich purple & violet primary brand identity (`#6739E8` / `#8B5CF6`) and dark sidebar (`#17152B`).

---

## 🏛️ Platform Stakeholders & Role Portals

| Role | Portal URL | Primary Capabilities |
| :--- | :--- | :--- |
| **Citizens** | `/citizen` | Submit geotagged grievances with camera, track real-time SLA countdowns, browse central/state/municipal welfare schemes, verify resolved work, earn civic reward points. |
| **Nagar Sevaks (Elected Reps)** | `/nagarsevak` | Supervisory read-only oversight of constituency issues, critical P0 alarms, ward budget tracking, infrastructure projects. |
| **Municipal Field Staff** | `/staff` | Field task dispatch queue, GPS attendance, upload after-repair evidence photos with AI structural change analysis. |
| **Municipal Administrators** | `/admin` | Citywide command center, automated P0–P4 SLA routing, department triage, live audit logs, and PDF export. |
| **Platform Super Admins** | `/superadmin` | Multi-organization tenant provisioning, statewide analytics, infrastructure health. |
| **AI Control Center** | `/ai-control` | Computer Vision threshold tuning, difference-hash duplicate matching, human-in-the-loop review queue. |

---

## ⚡ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router DOM, Lucide Icons, Recharts, Leaflet GIS, Progressive Web App (Service Worker + Web App Manifest).
- **Backend**: Python 3.12+, FastAPI, SQLAlchemy ORM, Pydantic, Passlib/Bcrypt, Uvicorn, Pillow (PIL) Computer Vision & Perceptual Hashing.
- **Database**: MySQL 8.0+ / PostgreSQL (production-ready) / SQLite (zero-config dev).
- **Deployment**:
  - **Frontend**: Vercel / Cloudflare Pages (`frontend/vercel.json`)
  - **Backend**: Render / AWS ECS / Railway (`backend/render.yaml`, `Dockerfile`)
  - **CI/CD**: GitHub Actions (`.github/workflows/ci-cd.yml`)

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python seed_data.py
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be live at: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 3000
```
Application will be live at: `http://127.0.0.1:3000`

---

## 📱 PWA Installation Instructions

JANSEVA runs as an installable standalone application across all platforms:
- **Windows / macOS (Chrome / Edge)**: Click the Install icon in the browser address bar or click "Install App" in the app header.
- **iPhone / iPad (iOS Safari)**: Tap the Share button &rarr; Tap "Add to Home Screen" &rarr; Tap "Add".
- **Android (Chrome / Samsung Internet)**: Tap the browser menu (⋮) &rarr; Tap "Install App" / "Add to Home screen".

---

## 🔒 DPDPA 2023 Compliance
In accordance with the **Digital Personal Data Protection Act (DPDPA), 2023**:
- Personal mobile numbers, email addresses, and residential floor numbers are **redacted from public views**.
- Citizens maintain granular consent controls for geolocation, AI voice processing, and photographic evidence.
- AI never autonomously rejects citizen grievances without authorized human review.

---

## 📄 License & Delivery
Engineered for municipal corporations, nagar parishads, and smart city development authorities.
All rights reserved © 2026 JANSEVA.
=======
# janseva-smart-civic-solutions
Smart Civic Solutions Platform
>>>>>>> 801620cd237bd8aed893d2764e59fe01e79c98df
