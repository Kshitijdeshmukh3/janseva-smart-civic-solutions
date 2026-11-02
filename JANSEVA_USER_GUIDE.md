# JANSEVA – USER GUIDE & OPERATIONAL MANUAL

## 1. Introduction & Overview
**JANSEVA – SMART CIVIC SOLUTIONS** is an enterprise smart municipal governance and citizen engagement platform. It bridges citizens, ward representatives (Nagar Sevaks), department engineers, and administrative commissioners to deliver transparent, accountable public service.

---

## 2. Navigating the Portals

### 2.1 Citizen Portal (`/citizen`, `/report`, `/track`)
- **Reporting a Civic Problem**:
  1. Click **"Report Civic Grievance"** from the top navbar or dashboard.
  2. Enter a descriptive title and select the category (e.g., Streetlights, Potholes, Water Supply, Drainage).
  3. Upload an evidence photograph from your camera or gallery.
  4. The AI Diagnostic Engine will automatically analyze image clarity, verify defect category alignment, extract OCR text, and screen for duplicate complaints.
  5. Select your DPDP 2023 privacy choice: *Public Anonymous* (name redacted on public map) or *Public Approved*.
  6. Click **"Submit Complaint"** to receive an instant tracking number (e.g., `JS-2026-00125`).

- **Tracking Live Progress**:
  1. Navigate to `/track` or use the quick search bar in the header.
  2. Input your Complaint ID.
  3. View real-time SLA countdown, assigned field engineer name, and chronological audit trail.

- **Two-Step Resolution Verification**:
  1. Once field work is marked complete, the citizen inspects the **Before-and-After Photo Comparison Slider**.
  2. If satisfied, click **"Confirm Satisfactory Resolution"** to earn **+20 Civic Reward Points**.
  3. If the defect persists, click **"Dispute & Reopen"** to immediately escalate to the Ward Executive Engineer.

- **Welfare Schemes (`/schemes`)**:
  - Filter by category (Housing, Healthcare, Women Empowerment, Students, Farmers, Senior Citizens, Civic Welfare).
  - Check eligibility criteria, required documents checklist, financial assistance amounts, and direct official portal links.

- **Ward Development Projects (`/projects`)**:
  - Inspect sanctioned municipal budgets, contractor compliance ratings, and before/after infrastructure evidence.

---

### 2.2 Nagar Sevak Supervisory Desk (`/nagarsevak`)
- **Constituency Oversight**:
  - Monitor all issues in your specific ward (e.g., Ward 14 - Kothrud North).
  - Track **Critical (P0) Alarms** requiring urgent departmental mobilization.
- **Budget & Works Tracking**:
  - Review ongoing stormwater drainage, road bituminization, and park development projects.
- **Read-Only Mode**:
  - To prevent conflicts of interest and maintain statutory separation of powers, ticket status changes are restricted to authorized field engineers.

---

### 2.3 Municipal Field Staff Mode (`/staff`)
- **Task Dispatch Queue**:
  - View assigned tickets sorted by SLA deadline and severity.
  - Click **"Start Work On-Site"** to flag tickets as `WORK_IN_PROGRESS`.
- **Completion Evidence Upload**:
  - Click **"Upload After-Photo & Complete Task"**.
  - Capture the repaired site photograph.
  - The AI engine validates structural improvement and geographic coordinate matching before allowing completion submission.

---

### 2.4 Municipal Admin Console (`/admin`)
- **Citywide Command Center**:
  - Filter complaints across all wards, departments, and priority bands (P0–P4).
  - Monitor field engineer attendance and departmental SLA compliance rates.
  - Click **"Export Audit PDF"** to generate statutory municipal review dossiers.

---

### 2.5 Platform Super Admin (`/superadmin`)
- **Multi-Tenant Administration**:
  - Provision municipal corporations, councils, and smart city SPVs.
  - Manage database clustering and statewide performance metrics.

---

### 2.6 AI Vision Control Center (`/ai-control`)
- **Threshold Sliders**:
  - Adjust the auto-verification confidence cutoff (e.g., 80%) and difference-hash duplicate distance.
- **Human-in-the-Loop Review Queue**:
  - Adjudicate flagged cases where citizen category differs from AI visual detection.
