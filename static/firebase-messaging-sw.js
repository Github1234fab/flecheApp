importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

firebase.initializeApp({
        apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
        authDomain: "bddjson.firebaseapp.com",
        projectId: "bddjson",
        storageBucket: "bddjson.appspot.com",
        messagingSenderId: "797023585100",
        appId: "1:797023585100:web:027f9c5c56324e9fa885e9",
        measurementId: "G-LVMXH11ESZ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
        console.log("Message received in background: ", payload);
        const { title, body, icon, image } = payload.notification;
        const options = {
                body: body || "Default Body",
                icon: icon || "/icon-192x192.png",
                image: image,
                data: payload.data,
        };

        self.registration.showNotification(title || "Notification", options);
});

self.addEventListener("push", (event) => {
        const data = event.data.json();
        const { title, body, icon, image } = data.notification;
        const options = {
                body: body,
                icon: icon || "/icon-192x192.png",
                image: image,
                data: data.data,
        };

        event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
        event.notification.close();
        const urlToOpen = event.notification.data.url || "https://fleche-app.com/";

        event.waitUntil(
                clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
                        if (clients.openWindow) {
                                return clients.openWindow(urlToOpen);
                        }
                })
        );
});
