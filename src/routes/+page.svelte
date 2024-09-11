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
                        const updatePromptShown = localStorage.getItem("updatePromptShown") === "true";

                        navigator.serviceWorker
                                .register("/firebase-messaging-sw.js")
                                .then((registration) => {
                                        console.log("Service Worker enregistré avec succès");

                                        registration.onupdatefound = () => {
                                                const installingWorker = registration.installing;
                                                if (installingWorker) {
                                                        installingWorker.onstatechange = () => {
                                                                if (installingWorker.state === "installed" && navigator.serviceWorker.controller && !updatePromptShown) {
                                                                        localStorage.setItem("updatePromptShown", "true");
                                                                        const userConfirmed = confirm("Une nouvelle version de l'application est disponible. Voulez-vous l'utiliser ?");
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
                                        console.error("Erreur lors de l'enregistrement du Service Worker :", error);
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
