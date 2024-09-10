import { getMessaging, onMessage } from "firebase/messaging";

// Initialisez Firebase et obtenez l'instance de messaging
const messaging = getMessaging();

// Écoutez les messages reçus lorsqu'ils sont au premier plan
onMessage(messaging, (payload) => {
        console.log("Message reçu dans l'application: ", payload);

        // Exemple de message personnalisé pour tester
        const customTitle = "Bonjour à tous";
        const customBody = "Ceci est un test";

        // Assurez-vous que les notifications sont autorisées
        if (Notification.permission === "granted") {
                // Options pour la notification
                const notificationOptions = {
                        body: customBody,
                        icon: payload.notification.icon || "/path/to/default/icon.png", // Assurez-vous d'avoir une icône par défaut si aucune n'est fournie
                        vibrate: [200, 100, 200], // Optionnel: vibration pour la notification
                };

                // Créez et affichez la notification avec le message personnalisé
                new Notification(customTitle, notificationOptions);
        } else {
                // Si les notifications ne sont pas autorisées, utilisez une alerte comme alternative
                alert(`${customTitle}: ${customBody}`);
        }
});
