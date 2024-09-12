const CACHE_NAME = "flech-cache-v3";
const urlsToCache = ["/", "/flecheApp/src/app.html", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

// Installer le service worker et mettre en cache les fichiers nécessaires
self.addEventListener("install", (event) => {
        console.log("Service Worker installing.");
        event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                        console.log("Cache ouvert");
                        return cache.addAll(urlsToCache);
                })
        );
        self.skipWaiting();
});

// Activer le service worker et supprimer les anciens caches
self.addEventListener("activate", (event) => {
        console.log("Service Worker activating.");
        event.waitUntil(
                caches.keys().then((cacheNames) => {
                        return Promise.all(
                                cacheNames.map((cacheName) => {
                                        if (cacheName !== CACHE_NAME) {
                                                return caches.delete(cacheName);
                                        }
                                })
                        );
                })
        );
        self.clients.claim();
});

// Intercepter les requêtes et servir les fichiers à partir du cache lorsque disponible
self.addEventListener("fetch", (event) => {
        if (event.request.method === "GET") {
                event.respondWith(
                        caches.match(event.request).then((response) => {
                                return (
                                        response ||
                                        fetch(event.request).then((fetchResponse) => {
                                                return caches.open(CACHE_NAME).then((cache) => {
                                                        cache.put(event.request, fetchResponse.clone());
                                                        return fetchResponse;
                                                });
                                        })
                                );
                        })
                );
        }
});
