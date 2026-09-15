const CACHE_NAME = 'filipinas-v5';
const CORE = [
  './','./index.html','./style.css','./script.js','./data.js',
  './assets.js','./manifest.json','./icon-192.png','./icon-512.png',
  './images/bukidnon-cover.png',
  './images/bukidnon-detail.png',
  './images/camiguin-cover.png',
  './images/camiguin-detail.png',
  './images/cdo-cover.png',
  './images/cdo-detail.png',
  './images/cebu-cover.png',
  './images/cebu-detail.png',
  './images/departure-cover.png',
  './images/departure-detail.png',
  './images/ferry-cover.png',
  './images/ferry-detail.png',
  './images/iligan-cover.png',
  './images/iligan-detail.png',
  './images/return-cdo-cover.png',
  './images/return-cdo-detail.png',
  './images/cdo-cover.png','./images/cdo-detail.png','./images/camiguin-cover.png','./images/camiguin-detail.png','./images/bukidnon-cover.png','./images/bukidnon-detail.png','./images/iligan-cover.png','./images/iligan-detail.png','./images/cebu-cover.png','./images/cebu-detail.png','./images/ferry-cover.png','./images/ferry-detail.png','./images/return-cdo-cover.png','./images/return-cdo-detail.png','./images/departure-cover.png','./images/departure-detail.png',
];

self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if (response.ok && response.type === 'basic') caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone())); return response; }).catch(() => caches.match('./index.html')))); });
