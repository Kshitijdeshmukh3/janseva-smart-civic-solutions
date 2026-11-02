# JANSEVA – PROGRESSIVE WEB APP (PWA) & DEVICE INSTALLATION GUIDE

JANSEVA provides an installable application experience across all major platforms, enabling 1-tap launcher access, full-screen standalone windows, offline availability, and background updates.

---

## 1. Windows PC (Google Chrome & Microsoft Edge)
1. Open `https://janseva.in` in Chrome or Edge.
2. In the right side of the address bar, click the **Install icon** (screen with down arrow) or click the **"Install JANSEVA App"** banner at the top of the page.
3. Click **"Install"** in the confirmation popup.
4. JANSEVA will launch in its own standalone window and add a shortcut to your Desktop and Start Menu.

---

## 2. Apple iPhone & iPad (Safari)
*(Apple iOS does not allow automatic install popups; follow these native WebKit steps)*:
1. Open `https://janseva.in` in **Safari**.
2. Tap the **Share icon** (a square with an upward pointing arrow) in the bottom navigation bar.
3. Scroll down the actions list and tap **"Add to Home Screen"**.
4. Tap **"Add"** in the top right corner.
5. The JANSEVA icon will appear on your iOS Home Screen. When opened, it runs in standalone full-screen mode without Safari address bars.

---

## 3. Android Devices (Google Chrome & Samsung Internet)
1. Open `https://janseva.in` in Chrome or Samsung Internet.
2. An automatic install banner will appear at the top or bottom of the screen. Tap **"Install App"**.
3. If the banner was dismissed, tap the **three dots menu (⋮)** in the top right corner and tap **"Install App"** or **"Add to Home screen"**.
4. Confirm by tapping **"Install"**. The app will be installed to your application drawer with full native badge and offline support.

---

## 4. Apple macOS (Safari & Google Chrome)
- **Safari on macOS Sonoma+**:
  1. Open `https://janseva.in`.
  2. In the menu bar, click **File -> Add to Dock**.
  3. Click **Add**. The JANSEVA icon will be placed directly in your macOS Dock.
- **Chrome on macOS**:
  1. Click the **Install icon** on the right side of the URL bar and confirm.

---

## 5. Offline Experience & Safe Data Caching
- **Cached Shell**: The Service Worker precaches the application shell, navigation components, and icons so the app opens instantly even with zero network connectivity.
- **Offline Fallback Page (`offline.html`)**: If a citizen loses connection while navigating, a clean offline banner with connection retry guidance is displayed.
- **Strict Privacy Preservation**: In accordance with DPDPA 2023, personal authentication tokens, live grievance databases, and sensitive photos are **never cached in the service worker**.
