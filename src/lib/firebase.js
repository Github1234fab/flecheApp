import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";

// Configuration Firebase
const firebaseConfig = {
        apiKey: "AIzaSyAEwpAek6JuWKBWxCZRWHIpJpFtLmngzLE",
        authDomain: "bddjson.firebaseapp.com",
        projectId: "bddjson",
        storageBucket: "bddjson.appspot.com",
        messagingSenderId: "797023585100",
        appId: "1:797023585100:web:027f9c5c56324e9fa885e9",
        measurementId: "G-LVMXH11ESZ",
};

// Initialiser Firebase App
const app = initializeApp(firebaseConfig);

// Initialiser Firebase Analytics uniquement côté client
export const initAnalytics = async () => {
        if (typeof window !== "undefined" && (await isAnalyticsSupported())) {
                return initializeAnalytics(app);
        } else {
                console.log("Firebase Analytics n'est pas pris en charge dans cet environnement.");
                return null;
        }
};

// Initialiser Firestore
export const db = getFirestore(app);

// Fonction pour sauvegarder le token sur le serveur
const saveTokenToServer = async (token) => {
        try {
                const response = await fetch("/server.js", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                });

                const responseText = await response.text(); // Capturez la réponse complète en texte

                if (response.ok) {
                        console.log("Token enregistré avec succès sur le serveur.");
                } else {
                        console.error("Erreur lors de l'enregistrement du token sur le serveur.");
                        console.error("Statut de la réponse :", response.status); // Affichez le statut HTTP
                        console.error("Corps de la réponse :", responseText); // Affichez la réponse texte
                }
        } catch (error) {
                console.error("Erreur lors de l'appel API:", error);
        }
};

// Initialiser Firebase Cloud Messaging uniquement côté client
export const initMessaging = () => {
        if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
                const messaging = getMessaging(app);

                requestNotificationPermission(messaging);

                // Gestion des messages reçus lorsque l'application est au premier plan
                onMessage(messaging, (payload) => {
                        console.log("Message reçu: ", payload);
                        // Vous pouvez personnaliser ici comment afficher la notification
                        const notificationTitle = payload.notification.title || "Default Title";
                        const notificationOptions = {
                                body: payload.notification.body || "Default Body",
                                icon: payload.notification.icon || "/icon-192x192.png",
                                image: payload.notification.image,
                        };

                        new Notification(notificationTitle, notificationOptions);
                });
        }
};

// Fonction pour demander la permission de notification
const requestNotificationPermission = async (messaging) => {
        try {
                console.log("Demande de permission pour les notifications...");
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                        console.log("Permission de notification accordée.");

                        const token = await getToken(messaging, {
                                vapidKey: "BEUciyC870MQL1OE-SKilJS_lKV_ZBNXsuoo4FtojJhTpLaMbM0Tik18syIMwEGmmNMymQ9Sf1BgMIEWc8-liOg",
                        });

                        console.log("Token de notification:", token);

                        // Envoyer ce token à votre serveur pour stockage et utilisation
                        await saveTokenToServer(token);
                } else {
                        console.log("Permission de notification refusée.");
                }
        } catch (error) {
                console.error("Erreur lors de la demande de permission de notification:", error);
        }
};

// Appeler cette fonction uniquement côté client pour initialiser Firebase Messaging
if (typeof window !== "undefined") {
        initMessaging();
}
