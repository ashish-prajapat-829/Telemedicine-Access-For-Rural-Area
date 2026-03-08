// Simple service worker to cache assets for offline use
const CACHE = 'nhc-cache-v1';
const ASSETS = [
  './',
  './index.html', './patient.html', './doctor.html', './pharmacy.html', './admin.html', './ai.html', './about.html',
  './styles.css', './main.js', './webrtc.js', './patient.js', './doctor.js', './pharmacy.js', './admin.js', './ai.js',
  './i18n/i18n.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k!==CACHE).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, copy));
      return res;
    }).catch(() => cached))
  );
});