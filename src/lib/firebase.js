import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";

// Configuration Firebase
const firebaseConfig = {
        apiKey: "AIzaSyAKcdwYEmG5yDgq9FDPv5daB5VxdKHcZPc",
        authDomain: "bddtest-6a03f.firebaseapp.com",
        projectId: "bddtest-6a03f",
        storageBucket: "bddtest-6a03f.appspot.com",
        messagingSenderId: "78035008130",
        appId: "1:78035008130:web:471cacd24cb8a7f2bed29b",
        measurementId: "G-4FNYWSXMZG",
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

// Initialiser Firebase Cloud Messaging uniquement côté client
export const initMessaging = () => {
        if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
                const messaging = getMessaging(app);

                requestNotificationPermission(messaging);

                // Gestion des messages reçus lorsque l'application est au premier plan
                onMessage(messaging, (payload) => {
                        console.log("Message received. ", payload);
                        // Personnalisez la notification ici
                });
        }
};

// Fonction pour demander la permission de notification
const requestNotificationPermission = async (messaging) => {
        try {
                console.log("Requesting permission...");
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                        console.log("Notification permission granted.");

                        const token = await getToken(messaging, {
                                vapidKey: "",
                        });

                        console.log("Notification token:", token);

                        // TODO: Envoyer ce token à votre serveur pour stockage et utilisation
                        // await saveTokenToServer(token);
                } else {
                        console.log("Notification permission denied.");
                }
        } catch (error) {
                console.error("Error requesting notification permission:", error);
        }
};

// Appeler cette fonction uniquement côté client pour initialiser Firebase Messaging
if (typeof window !== "undefined") {
        initMessaging();
}
