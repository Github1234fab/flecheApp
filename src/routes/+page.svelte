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
            // Enregistrer le service worker pour FCM
            navigator.serviceWorker.register("/firebase-messaging-sw.js")
                .then((registration) => {
                    console.log("FCM Service Worker enregistré avec succès");

                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        if (installingWorker) {
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                                    const userConfirmed = confirm("Une nouvelle version est disponible. Voulez-vous l'utiliser ?");
                                    if (userConfirmed) {
                                        window.location.reload();
                                    }
                                }
                            };
                            
                        }
                    };

                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            console.log("Permission de notification accordée.");
                        } else {
                            console.log("Permission de notification refusée.");
                        }
                    });
                })
                .catch((error) => {
                    console.error("Erreur lors de l'enregistrement du FCM Service Worker :", error);
                });

            // Enregistrer le service worker pour la mise en cache et autres tâches
            navigator.serviceWorker.register("/service-worker.js")
                .then((registration) => {
                    console.log("Service Worker enregistré avec succès pour le cache et les mises à jour.");
                })
                .catch((error) => {
                    console.error("Erreur lors de l'enregistrement du Service Worker pour le cache :", error);
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
