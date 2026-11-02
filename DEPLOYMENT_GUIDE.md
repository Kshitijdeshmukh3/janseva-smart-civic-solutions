# JANSEVA – PERMANENT CLOUD DEPLOYMENT GUIDE

This guide provides end-to-end instructions for permanently deploying **JANSEVA** to production without relying on local developer machines.

---

## 1. Architecture Topology
- **Frontend**: Hosted on [Vercel](https://vercel.com) (or Cloudflare Pages).
- **Backend API**: Hosted on [Render](https://render.com) (or AWS ECS / Railway).
- **Database**: Managed Cloud MySQL 8.0 (AWS RDS / PlanetScale / Aiven / Render MySQL).
- **Static Media & Photographic Evidence**: Cloudinary or Amazon S3.

---

## 2. Step 1: Database Setup (Managed MySQL)
1. Provision a MySQL 8.0 instance on AWS RDS, Render, or Aiven.
2. Obtain the database connection string:
   ```
   mysql+pymysql://<user>:<password>@<host>:3306/<database_name>
   ```
3. Set character set to `utf8mb4` and collation to `utf8mb4_unicode_ci`.

---

## 3. Step 2: Backend Deployment on Render
1. Connect your GitHub repository to Render.
2. Select **"Blueprint"** to use the pre-configured `render.yaml` or create a **Web Service**:
   - **Environment**: Python 3.12+ (or Docker via `backend/Dockerfile`).
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python seed_data.py && uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4`
3. Configure Environment Variables in Render Dashboard:
   - `DATABASE_URL`: Your managed MySQL connection string.
   - `SECRET_KEY`: High-entropy 64-character secret key.
   - `BACKEND_CORS_ORIGINS`: `["https://janseva.vercel.app", "https://janseva.in"]`
   - `OPENAI_API_KEY`: *(Optional)* Your OpenAI key for AI assistance.
4. Verify backend health:
   ```
   GET https://your-backend.onrender.com/api/v1/health
   ```

---

## 4. Step 3: Frontend Deployment on Vercel
1. Import your GitHub repository to Vercel.
2. Set the **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Configure Environment Variables in Vercel:
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com`
7. Click **Deploy**. Vercel will process `frontend/vercel.json` and configure SPA routing and PWA caching headers automatically.

---

## 5. Step 4: Custom Domain & SSL
1. In Vercel, navigate to **Settings -> Domains** and add `janseva.in` and `www.janseva.in`.
2. Configure DNS A Record (`76.76.21.21`) and CNAME record at your domain registrar.
3. In Render, navigate to **Settings -> Custom Domains** and add `api.janseva.in`.
4. Point DNS CNAME `api` to Render's service URL.
5. SSL certificates are provisioned automatically via Let's Encrypt with automated renewal.

---

## 6. Rollback & Disaster Recovery Procedures
1. **Frontend Instant Rollback**: In Vercel, navigate to **Deployments -> Instant Rollback** to restore any previous production deployment in under 5 seconds.
2. **Database Automated Backups**: Configure daily automated snapshots with 30-day point-in-time recovery on your managed MySQL database.
