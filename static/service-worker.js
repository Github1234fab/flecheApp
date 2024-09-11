const CACHE_NAME = "flech-cache-v3";
const urlsToCache = ["/", "/flecheApp/src/app.html", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

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

// Gestion des notifications push
self.addEventListener("push", (event) => {
        const data = event.data.json();
        const title = data.notification.title || "Notification";
        const options = {
                body: data.notification.body,
                icon: data.notification.icon || "/icon-192x192.png",
        };

        event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
        event.notification.close();
        event.waitUntil(
                clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
                        if (clients.openWindow) {
                                return clients.openWindow("https://fleche-app.com/");
                        }
                })
        );
});
