export const sendNotification = async (deviceToken) => {
        const browserKey = "BEUciyC870MQL1OE-SKilJS_lKV_ZBNXsuoo4FtojJhTpLaMbM0Tik18syIMwEGmmNMymQ9Sf1BgMIEWc8-liOg";
        const url = "https://fcm.googleapis.com/fcm/send";

        const payload = {
                to: deviceToken,
                notification: {
                        title: "Nouvelle mise à jour",
                        body: "Une nouvelle mise à jour est disponible",
                        icon: "/icon-192x192.png",
                        image: "/image.png",
                },
                data: {
                        update: "yes",
                        url: "https://example.com/update",
                },
        };

        const options = {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `key=${browserKey}`,
                },
                body: JSON.stringify(payload),
        };

        try {
                const response = await fetch(url, options);
                if (response.ok) {
                        console.log("Notification envoyée avec succès");
                } else {
                        console.error("Erreur lors de l'envoi de la notification", response.statusText);
                }
        } catch (error) {
                console.error("Erreur lors de l'envoi de la notification", error);
        }
};
