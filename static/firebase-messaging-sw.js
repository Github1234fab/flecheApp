// Importation des scripts Firebase après bundling avec Webpack
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
        apiKey: "AIzaSyAKcdwYEmG5yDgq9FDPv5daB5VxdKHcZPc",
        authDomain: "bddtest-6a03f.firebaseapp.com",
        projectId: "bddtest-6a03f",
        storageBucket: "bddtest-6a03f.appspot.com",
        messagingSenderId: "78035008130",
        appId: "1:78035008130:web:471cacd24cb8a7f2bed29b",
        measurementId: "G-4FNYWSXMZG",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
        console.log("Received background message ", payload);

        // Verify the notification payload
        const notificationTitle = payload.notification.title || "Default Title";
        const notificationOptions = {
                body: payload.notification.body || "Default Body",
                // icon: "/firebase-logo.png",
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
});
