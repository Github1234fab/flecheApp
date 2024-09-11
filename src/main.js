// const admin = require("firebase-admin");

// // Initialiser Firebase Admin SDK avec votre clé de service
// admin.initializeApp({
//         credential: admin.credential.cert("path/to/serviceAccountKey.json"),
//         databaseURL: "https://BDDJson.firebaseio.com",
// });

// // Créer le message pour le topic "all_users"
// const message = {
//         notification: {
//                 title: "Message pour tous",
//                 body: "Ceci est une notification pour tous les utilisateurs de l'appli",
//         },
//         topic: "all_users", // Envoyer à tous les utilisateurs abonnés
// };

// // Envoyer la notification à tous les utilisateurs
// admin.messaging()
//         .send(message)
//         .then((response) => {
//                 console.log("Notification envoyée avec succès:", response);
//         })
//         .catch((error) => {
//                 console.error("Erreur lors de l'envoi de la notification:", error);
//         });
