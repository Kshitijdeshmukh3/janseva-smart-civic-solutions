# JANSEVA – GITHUB SETUP & SOURCE CONTROL GUIDE

This guide outlines how to initialize, configure, and maintain the professional GitHub repository for **JANSEVA – SMART CIVIC SOLUTIONS**.

---

## 1. Initializing Git Repository
From the project root directory (`C:\Users\Dell\.gemini\antigravity\scratch\janseva`):

```bash
# Initialize git
git init -b main

# Add all files (respecting .gitignore)
git add .

# Create initial baseline commit
git commit -m "feat: initial enterprise release of JANSEVA Smart Civic Solutions platform"
```

---

## 2. Pushing to GitHub
1. Create a new private or public repository on GitHub (e.g. `https://github.com/your-org/janseva`).
2. Add the remote and push:
   ```bash
   git remote add origin https://github.com/your-org/janseva.git
   git branch -M main
   git push -u origin main
   ```

---

## 3. Branching Strategy & Git Workflow
- **`main`**: Production-ready branch. Every push triggers automated CI/CD and deploys directly to production on Vercel and Render.
- **`develop`**: Integration branch for pre-release testing.
- **`feature/<feature-name>`**: Feature branches branched from `develop` and merged via pull request.

---

## 4. GitHub Actions CI/CD Pipeline
The repository includes `.github/workflows/ci-cd.yml` which executes automatically on every push or pull request to `main`:
1. **Backend Validation**:
   - Python 3.12 environment setup.
   - Flake8 syntax and lint check.
   - Seed database generation test.
   - Router and endpoint health verification.
2. **Frontend Validation**:
   - Node.js 20 environment setup.
   - `npm run build` execution.
   - PWA manifest (`manifest.webmanifest`), service worker (`sw.js`), and offline fallback verification.
3. **Deployment Trigger**:
   - Webhook trigger to Vercel and Render with automatic commit hash rollback tagging.

---

## 5. Security Rules & Secrets Hygiene
- **Never commit `.env` or `.pem` keys**: Enforced by `.gitignore`.
- Set repository secrets in GitHub:
  - `RENDER_DEPLOY_HOOK_URL`: Trigger webhook for backend service.
  - `VERCEL_TOKEN`: Deployment token for frontend builds.
