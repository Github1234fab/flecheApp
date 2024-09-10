// // Configuration du cache
// const CACHE_NAME = "flech-cache-v3";
// const urlsToCache = ["/", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

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
//         const requestURL = new URL(event.request.url);

//         // Ignorer les requêtes avec le schéma 'chrome-extension'
//         if (requestURL.protocol === "chrome-extension:") {
//                 return;
//         }

//         if (event.request.method === "GET") {
//                 event.respondWith(
//                         caches.open(CACHE_NAME).then((cache) => {
//                                 return cache.match(event.request).then((response) => {
//                                         return (
//                                                 response ||
//                                                 fetch(event.request).then((response) => {
//                                                         cache.put(event.request, response.clone());
//                                                         return response;
//                                                 })
//                                         );
//                                 });
//                         })
//                 );
//         } else {
//                 event.respondWith(fetch(event.request));
//         }
// });


// // Gestion des notifications push
// self.addEventListener("push", (event) => {
//   console.log("Push event received:", event);

//   const data = event.data.json();
//   const title = data.notification.title || "Notification";
//   const options = {
//     body: data.notification.body,
//     icon: data.notification.icon,
//     data: data.data // Ajoutez des données supplémentaires si nécessaire
//   };

//   event.waitUntil(
//     self.registration.showNotification(title, options)
//   );
// });

// self.addEventListener("notificationclick", function (event) {
//         event.notification.close(); // Fermer la notification après le clic
//         event.waitUntil(
//                 clients.matchAll({ type: "window" }).then(function (clientList) {
//                         if (clients.openWindow) {
//                                 return clients.openWindow("https://fleche-app.com/");
//                         }
//                 })
//         );
// });