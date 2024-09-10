<script>
        import Calendar from "../components/Calendar.svelte";
        import UpLoadJson from "../components/UpLoadJson.svelte";
        import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
        import "../routes/styles.css";
        import { onMount } from "svelte";
        import { initMessaging, initAnalytics } from "$lib/firebase";

onMount(() => {
    // Initialiser Firebase Analytics et Messaging
    initAnalytics();
    initMessaging();

    if ("serviceWorker" in navigator) {
        // Vérifier si la pop-up de mise à jour a déjà été montrée
        const updatePromptShown = localStorage.getItem("updatePromptShown") === "true";

        // Enregistrement du service worker principal
        navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then((registration) => {
                console.log("Service Worker principal enregistré avec succès");

                // Vérifier les mises à jour du Service Worker
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === "installed") {
                                if (navigator.serviceWorker.controller && !updatePromptShown) {
                                    // Enregistrer que la pop-up a été montrée
                                    localStorage.setItem("updatePromptShown", "true");

                                    const userConfirmed = confirm(
                                        "Une nouvelle version de l'application est disponible. Voulez-vous  l'utiliser?"
                                    );

                                    if (userConfirmed) {
                                        window.location.reload();
                                    } else {
                                        console.log("L'utilisateur a choisi de ne pas recharger.");
                                    }
                                } else if (!navigator.serviceWorker.controller) {
                                    console.log("Service Worker installé pour la première fois.");
                                }
                            }
                        };
                    }
                };

                // Demander la permission pour les notifications
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        console.log("Permission de notification accordée.");
                    } else {
                        console.log("Permission de notification refusée.");
                    }
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'enregistrement du Service Worker principal:", error);
            });

        // Enregistrement du service worker pour Firebase Cloud Messaging
        navigator.serviceWorker
            .register("/firebase-messaging-sw.js") // Utilisation du fichier bundlé
            .then((registration) => {
                console.log("Service Worker Firebase enregistré avec succès");

                // Vérifiez les mises à jour et autres fonctionnalités spécifiques à Firebase si nécessaire
            })
            .catch((error) => {
                console.error("Erreur lors de l'enregistrement du Service Worker Firebase:", error);
            });
    }
});


</script>

<main>
        <Calendar />
        <UpLoadJson />
        <UpLoadJsonAdvertisement />
</main>

<style>
        main {
                height: auto;
        }
</style>