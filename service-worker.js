const CACHE_NAME = 'filipinas-v8-1-2';

const CORE = [
  './', './index.html', './style.css', './script.js', './data.js',
  './photos-v8.1.js', './manifest.json', './icon-192.png', './icon-512.png'
];

function isDestinationPhoto(request) {
  const url = new URL(request.url);
  return request.destination === 'image' &&
    (url.hostname === 'upload.wikimedia.org' || url.hostname === 'commons.wikimedia.org');
}

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      const response = await fetch(event.request);
      if (response && response.ok && isDestinationPhoto(event.request)) {
        const clone = response.clone();
        event.waitUntil(
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {})
        );
      }
      return response;
    } catch (error) {
      return caches.match('./index.html');
    }
  })());
});
