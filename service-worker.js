// V8.9.0 — Atomic shell install, explicit updates, app-owned caches only.
const CACHE = "filipinas-v8-9-0";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./today.css",
  "./budget.css",
  "./field-notes.css",
  "./data.js",
  "./journey.js",
  "./i18n.js",
  "./flights.js",
  "./photos.js",
  "./today.js",
  "./budget.js",
  "./exports.js",
  "./documentary-data.js",
  "./documentary.js",
  "./journal.js",
  "./script.js",
  "./manifest.json",
  "./flag-ph.svg",
  "./icon-192.png",
  "./icon-512.png",
];
const LOCAL_IMAGES = [
  "./images/airport.webp",
  "./images/bukidnon.webp",
  "./images/camiguin.webp",
  "./images/cdo.webp",
  "./images/cebu.webp",
  "./images/ferry.webp",
  "./images/fort-san-pedro.webp",
  "./images/guiob.webp",
  "./images/iligan.webp",
  "./images/kawasan.webp",
  "./images/madrid-barajas.webp",
  "./images/mantigue.webp",
  "./images/oslob.webp",
  "./images/santo-nino.webp",
  "./images/sheikh-zayed-mosque.webp",
  "./images/sirao.webp",
  "./images/taoist-temple.webp",
  "./images/temple-of-leah.webp",
  "./images/tuasan.webp",
  "./images/zayed-airport.webp",
];
self.addEventListener("install", (event) => {
  // Bypass HTTP cache so a new worker cannot precache an old shell.
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll(
          [...APP_SHELL, ...LOCAL_IMAGES].map(
            (url) => new Request(url, { cache: "reload" }),
          ),
        ),
      ),
  );
  // Existing clients choose "Update"; no forced reload while writing.
});
self.addEventListener("activate", (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("filipinas-v") && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.href.startsWith(self.registration.scope)
  )
    return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(event.request, { ignoreSearch: true });
      if (cached) return cached;
      try {
        const response = await fetch(event.request);
        // A full cache must not turn a successful network response into a failure.
        if (response.ok)
          await cache.put(event.request, response.clone()).catch(() => {});
        return response;
      } catch {
        return event.request.mode === "navigate"
          ? (await cache.match("./index.html")) || Response.error()
          : Response.error();
      }
    }),
  );
});
