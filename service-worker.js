const CACHE='filipinas-v8-4-0';
const APP_SHELL=['./','./index.html','./style.css','./today.css','./data.js','./photos.js','./script.js','./today.js','./manifest.json','./icon-192.png','./icon-512.png'];
const LOCAL_IMAGES=['./images/airport.webp','./images/bukidnon.webp','./images/camiguin.webp','./images/cdo.webp','./images/cebu.webp','./images/ferry.webp','./images/fort-san-pedro.webp','./images/guiob.webp','./images/iligan.webp','./images/kawasan.webp','./images/mantigue.webp','./images/oslob.webp','./images/santo-nino.webp','./images/sirao.webp','./images/taoist-temple.webp','./images/temple-of-leah.webp','./images/tuasan.webp'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll([...APP_SHELL,...LOCAL_IMAGES]))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
