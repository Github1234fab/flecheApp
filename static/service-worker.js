// // Configuration du cache
// const CACHE_NAME = "flech-cache-v3";
// const urlsToCache = ["/", "/src/app.html", "/src/routes/styles.css" , "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

// self.addEventListener("install", (event) => {
//         console.log("Service Worker installing.");
//         event.waitUntil(
//                 caches.open(CACHE_NAME).then((cache) => {
//                         console.log("Opened cache");
//                         return cache.addAll(urlsToCache);
//                 })
//         );
//         self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//         console.log("Service Worker activating.");
//         event.waitUntil(
//                 caches.keys().then((cacheNames) => {
//                         return Promise.all(
//                                 cacheNames.map((cacheName) => {
//                                         if (cacheName !== CACHE_NAME) {
//                                                 return caches.delete(cacheName);
//                                         }
//                                 })
//                         );
//                 })
//         );
//         self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//         event.respondWith(
//                 caches.match(event.request).then((response) => {
//                         return response || fetch(event.request);
//                 })
//         );
// });
