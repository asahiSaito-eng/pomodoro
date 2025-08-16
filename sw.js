const CACHE_NAME = "pomodoro-cache-v1";
const urlsToCache = [
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/img/play.png",
  "/img/pause.png",
  "/img/stop.png",
  "/img/apple-touch-icon-180.png",
  "/img/alarm.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
