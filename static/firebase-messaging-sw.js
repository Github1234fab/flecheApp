// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// const firebaseConfig = {
//         apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
//         authDomain: "bddjson.firebaseapp.com",
//         projectId: "bddjson",
//         storageBucket: "bddjson.appspot.com",
//         messagingSenderId: "797023585100",
//         appId: "1:797023585100:web:2b0fe7ee054fdcc6a885e9",
//         measurementId: "G-3JB2081G3X",
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//         console.log("Received background message ", payload);

//         const notificationTitle = payload.notification.title || "Default Title";
//         const notificationOptions = {
//                 body: payload.notification.body || "Default Body",
//                 icon: payload.notification.icon || "/icon-192x192.png",
//                 image: payload.notification.image,
//         };

//         self.registration.showNotification(notificationTitle, notificationOptions);
// });





importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Configuration Firebase
const firebaseConfig = {
        apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
        authDomain: "bddjson.firebaseapp.com",
        projectId: "bddjson",
        storageBucket: "bddjson.appspot.com",
        messagingSenderId: "797023585100",
        appId: "1:797023585100:web:2b0fe7ee054fdcc6a885e9",
        measurementId: "G-3JB2081G3X",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Gestion des messages en arrière-plan avec Firebase
messaging.onBackgroundMessage((payload) => {
        console.log("Received background message ", payload);

        const notificationTitle = payload.notification.title || "Default Title";
        const notificationOptions = {
                body: payload.notification.body || "Default Body",
                icon: payload.notification.icon || "/icon-192x192.png",
                image: payload.notification.image,
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
});

// Gestion des notifications push génériques
self.addEventListener("push", (event) => {
        console.log("Push event received:", event);

        const data = event.data.json();
        const title = data.notification.title || "Notification";
        const options = {
                body: data.notification.body,
                icon: data.notification.icon,
                data: data.data, // Ajoutez des données supplémentaires si nécessaire
        };

        event.waitUntil(self.registration.showNotification(title, options));
});

// Gestion du clic sur une notification
self.addEventListener("notificationclick", function (event) {
        event.notification.close(); // Fermer la notification après le clic
        event.waitUntil(
                clients.matchAll({ type: "window" }).then(function (clientList) {
                        if (clients.openWindow) {
                                return clients.openWindow("https://fleche-app.com/");
                        }
                })
        );
});

// Cache et gestion des fetch
const CACHE_NAME = "flech-cache-v3";
const urlsToCache = ["/", "/icon-192x192.png", "/icon-512x512.png", "/manifest.json"];

self.addEventListener("install", (event) => {
        console.log("Service Worker installing.");
        event.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                        console.log("Opened cache");
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
        const requestURL = new URL(event.request.url);

        // Ignorer les requêtes avec le schéma 'chrome-extension'
        if (requestURL.protocol === "chrome-extension:") {
                return;
        }

        if (event.request.method === "GET") {
                event.respondWith(
                        caches.open(CACHE_NAME).then((cache) => {
                                return cache.match(event.request).then((response) => {
                                        return (
                                                response ||
                                                fetch(event.request).then((response) => {
                                                        cache.put(event.request, response.clone());
                                                        return response;
                                                })
                                        );
                                });
                        })
                );
        } else {
                event.respondWith(fetch(event.request));
        }
});
