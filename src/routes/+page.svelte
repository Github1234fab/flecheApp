<script>
    import Calendar from "../components/Calendar.svelte";
    import UpLoadJson from "../components/UpLoadJson.svelte";
    import UpLoadJsonAdvertisement from "../components/UpLoadJsonAdvertisement.svelte";
    import "../routes/styles.css";
    import { onMount } from "svelte";
    import { initMessaging, initAnalytics } from "$lib/firebase";
    import { requestNotificationPermission } from "../lib/firebase.js";
    import { sendNotification } from "../lib/sendNotification.js";

    onMount(async () => {
        // Initialiser Firebase Analytics et Messaging
        initAnalytics();
        initMessaging();

        const deviceToken = await requestNotificationPermission();
        if (deviceToken) {
            console.log("Token de l'appareil:", deviceToken);
            await sendNotification(deviceToken);
        }

        if ("serviceWorker" in navigator) {
            // Enregistrer le service worker pour FCM
            const fcmRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
            console.log("FCM Service Worker enregistré avec succès");

            fcmRegistration.onupdatefound = () => {
                const installingWorker = fcmRegistration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                        const userConfirmed = confirm("Une nouvelle version est disponible. Voulez-vous l'utiliser ?");
                        if (userConfirmed) {
                            window.location.reload();
                        }
                    }
                };
            };

            // Enregistrer le service worker pour le cache et autres tâches
            const cacheRegistration = await navigator.serviceWorker.register("/service-worker.js");
            console.log("Service Worker pour cache enregistré avec succès");
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
