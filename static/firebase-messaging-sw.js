importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging.js");

// Configuration Firebase (Ne pas réinitialiser ici, utiliser les scripts importés)
const firebaseConfig = {
        apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
        authDomain: "bddjson.firebaseapp.com",
        projectId: "bddjson",
        storageBucket: "bddjson.appspot.com",
        messagingSenderId: "797023585100",
        appId: "1:797023585100:web:027f9c5c56324e9fa885e9",
        measurementId: "G-LVMXH11ESZ",
};

// Ne pas initialiser Firebase ici
// firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Gestion des notifications push
messaging.onBackgroundMessage((payload) => {
        console.log("Message received in background. ", payload);
        const { title, body, icon } = payload.notification;
        const options = {
                body: body || "Default Body",
                icon: icon || "/icon-192x192.png",
        };

        self.registration.showNotification(title || "Notification", options);
});

// Gestion des clics sur les notifications
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
