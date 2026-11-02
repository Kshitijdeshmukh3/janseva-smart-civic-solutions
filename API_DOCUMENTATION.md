# JANSEVA – REST API SPECIFICATION & INTEGRATION GUIDE

Base API URL: `http://127.0.0.1:8000/api/v1` (Production: `https://api.janseva.in/api/v1`)
Interactive Swagger Docs: `/docs`
ReDoc Reference: `/redoc`

---

## 1. Authentication Endpoints (`/auth`)
- `POST /api/v1/auth/login`: Authenticate with email/mobile and password. Returns JWT bearer token.
- `POST /api/v1/auth/register`: Register a new citizen account with DPDP consent.
- `GET /api/v1/auth/me`: Retrieve current logged-in user profile, role, and reward points.

---

## 2. Civic Complaints & Grievances (`/complaints`)
- `GET /api/v1/complaints/`: List grievances with filters (`ward_id`, `category_id`, `status`, `priority`).
- `POST /api/v1/complaints/`: Submit a new complaint with title, description, category, latitude, longitude, and photo evidence.
- `GET /api/v1/complaints/{id}`: Retrieve detailed grievance dossier including chronological audit timeline.
- `POST /api/v1/complaints/verify-image`: AI Computer Vision diagnostic endpoint. Analyzes image clarity, validates defect category alignment, checks perceptual difference hash for duplicates, and extracts OCR text.
- `POST /api/v1/complaints/{id}/verify-completion`: Citizen confirmation or dispute on completed field work.

---

## 3. Government & Welfare Schemes (`/schemes`)
- `GET /api/v1/schemes/`:
  - Query parameters: `category` (Housing, Healthcare, etc.), `level` (CENTRAL, STATE, MUNICIPAL), `search` (keyword), `is_featured` (boolean).
  - Returns verified list of government schemes with financial assistance, eligibility criteria, required documents checklist, and official portal links.
- `GET /api/v1/schemes/{id}`: Detailed scheme specification dossier.

---

## 4. Ward Development Projects (`/projects`)
- `GET /api/v1/projects/`:
  - Query parameters: `organization_id`, `ward_id`, `category`, `status`, `search`.
  - Returns projects with approved budget, allocated funds, recorded expenditure, execution %, contractor compliance rating, milestones, and before/after photos.
- `GET /api/v1/projects/stats`: Aggregate ward metrics (total projects, budget, expenditure, average progress).
- `GET /api/v1/projects/{id}`: Detailed milestone checklist and contractor audit dossier.

---

## 5. AI Assistant & Diagnostics (`/ai`)
- `POST /api/v1/ai/suggest-complaint`: Analyzes natural language citizen inputs in English, Hindi, or Marathi and outputs structured category, priority, and summary recommendations.
- `GET /api/v1/ai/stats`: Operational AI performance metrics (images analyzed, duplicate catch rate, average confidence).
- `GET /api/v1/ai/review-queue`: Fetches cases flagged for human-in-the-loop review.

---

## 6. System Health (`/health`)
- `GET /api/v1/health`: Returns API status, database latency, and timestamp.
