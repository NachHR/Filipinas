// V8.12.0 — Atomic shell install, explicit updates, app-owned caches only.
const CACHE = "filipinas-v8-12-0";
const APP_SHELL = [
  "./",
  "./index.html",
  "./PHOTO-CREDITS.md",
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
  "./shooting-data.js",
  "./documentary.js",
  "./journal.js",
  "./script.js",
  "./manifest.json",
  "./flag-ph.svg",
  "./icon-flag-192.png",
  "./icon-flag-512.png",
  "./icon-flag-maskable-512.png",
];
const LOCAL_IMAGES = [
  "./images/airport.webp",
  "./images/amaya-view.webp",
  "./images/bukidnon.webp",
  "./images/camiguin.webp",
  "./images/campville-riverside.webp",
  "./images/carcar-market.webp",
  "./images/cdo-night.webp",
  "./images/cdo-port.webp",
  "./images/cdo.webp",
  "./images/cebu-heritage-monument.webp",
  "./images/cebu.webp",
  "./images/ferry.webp",
  "./images/firma_logo.webp",
  "./images/fort-san-pedro.webp",
  "./images/guiob.webp",
  "./images/iligan.webp",
  "./images/kawasan.webp",
  "./images/kitanglad.webp",
  "./images/madrid-barajas.webp",
  "./images/magellans-cross.webp",
  "./images/manolo-fortich.webp",
  "./images/mantigue.webp",
  "./images/oslob.webp",
  "./images/pearl-lounge.webp",
  "./images/santo-nino.webp",
  "./images/seven-seas.webp",
  "./images/sheikh-zayed-mosque.webp",
  "./images/simala.webp",
  "./images/sirao.webp",
  "./images/sumilon-sandbar.webp",
  "./images/sunken-cemetery.webp",
  "./images/taoist-temple.webp",
  "./images/temple-of-leah.webp",
  "./images/tuasan.webp",
  "./images/tumalog.webp",
  "./images/white-island.webp",
  "./images/zayed-airport.webp"
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
