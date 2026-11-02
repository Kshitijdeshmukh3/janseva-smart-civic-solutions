const CACHE_NAME = 'janseva-cache-v1.0.0';
const OFFLINE_FALLBACK_URL = '/offline.html';

// Static Shell Assets safe for offline caching
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/offline.html',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg'
];

// Install: Cache Shell & activate immediately if requested
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Purge old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. STRICT PRIVACY: NEVER cache API calls, tokens, media uploads, or sensitive data
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/docs') ||
    url.pathname.startsWith('/openapi.json') ||
    request.method !== 'GET' ||
    request.headers.get('Authorization')
  ) {
    return; // Pass through straight to network
  }

  // 2. Navigation requests (HTML pages): Network-first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return caches.match(OFFLINE_FALLBACK_URL);
          });
        })
    );
    return;
  }

  // 3. Static Assets (scripts, styles, fonts, icons): Cache-first with Network Fallback
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});

// Listen for update message from application
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
