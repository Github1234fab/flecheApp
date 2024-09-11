const fetch = require("node-fetch");

const sendNotification = async (topic) => {
        const message = {
                notification: {
                        title: "Bienvenue !", // Titre de la notification
                        body: "hello, bienvenue à tous!", // Message à envoyer
                        icon: "/default-icon.png", // Icône de la notification (facultatif)
                },
                to: `/topics/${topic}`, // Le topic auquel envoyer la notification
        };

        const response = await fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST",
                headers: {
                        Authorization: `Bearer <Ton jeton d'authentification JWT>`, // Clé JWT générée avec Firebase Admin
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
        });

        if (response.ok) {
                console.log("Notification sent successfully");
        } else {
                console.error("Failed to send notification:", response.statusText);
        }
};

sendNotification("all_users"); // Envoie la notification à tous les utilisateurs abonnés au topic "all_users"
