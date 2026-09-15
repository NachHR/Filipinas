const CACHE_NAME = 'filipinas-v7';

const CORE = [
  './', './index.html', './style.css', './script.js', './data.js',
  './manifest.json', './icon-192.png', './icon-512.png',
  './images/cdo-cover.svg', './images/cdo-detail.svg',
  './images/camiguin-cover.svg', './images/camiguin-detail.svg',
  './images/bukidnon-cover.svg', './images/bukidnon-detail.svg',
  './images/iligan-cover.svg', './images/iligan-detail.svg',
  './images/ferry-cover.svg', './images/ferry-detail.svg',
  './images/cebu-cover.svg', './images/cebu-detail.svg',
  './images/return-cdo-cover.svg', './images/return-cdo-detail.svg',
  './images/departure-cover.svg', './images/departure-detail.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE))
  );
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
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
