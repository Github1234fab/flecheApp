importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
        apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
        authDomain: "bddjson.firebaseapp.com",
        projectId: "bddjson",
        storageBucket: "bddjson.appspot.com",
        messagingSenderId: "797023585100",
        appId: "1:797023585100:web:027f9c5c56324e9fa885e9",
        measurementId: "G-LVMXH11ESZ",
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

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
