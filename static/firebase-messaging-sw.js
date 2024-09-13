importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

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
    const { title, body, icon, image } = payload.notification;
    const options = {
        body: body || "Default Body",
        icon: icon || "/icon-192x192.png",
        image: image, // si vous envoyez une image
        data: payload.data // Utilisé pour les actions personnalisées ou ouvrir une URL
    };

    self.registration.showNotification(title || "Notification", options);
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

// self.addEventListener("push", function (event) {
//             console.log("Push event received:", event);
//         const payload = event.data.json();
//         const title = payload.notification.title || "Notification";
//         const options = {
//                 body: payload.notification.body,
//                 icon: payload.notification.icon,
//                 image: payload.notification.image, // si vous envoyez une image
//                 data: payload.data, // Utilisé pour les actions personnalisées ou ouvrir une URL
//         };

//         event.waitUntil(self.registration.showNotification(title, options));
// });

self.addEventListener("push", (event) => {
        console.log("Push event received:", event);

        const data = event.data.json();
        const title = data.notification.title;
        const options = {
                body: payload.notification.body,
                icon: payload.notification.icon || "/icon-192x192.png",
                image: payload.notification.image, // si vous envoyez une image
                data: payload.data, // Utilisé pour les actions personnalisées ou ouvrir une URL
        };

        event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
        event.notification.close();
        event.waitUntil(clients.openWindow(event.notification.data.url));
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
