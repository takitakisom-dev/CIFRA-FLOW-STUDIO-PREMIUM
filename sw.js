const CACHE = 'cifra-flow-v1';
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => { if (k !== CACHE) return caches.delete(k); }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      const fetchPromise = fetch(e.request).then((netRes) => {
        if (netRes && netRes.status === 200 && e.request.url.startsWith(self.location.origin)) {
          const clone = netRes.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return netRes;
      }).catch(() => cacheRes);
      return cacheRes || fetchPromise;
    })
  );
});
