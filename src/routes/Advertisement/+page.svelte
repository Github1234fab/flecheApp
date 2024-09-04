<!-- <script>
        import TitleCollapse from "../../components/TitleCollapse.svelte";
        import ServicesCollapse from "../../components/ServicesCollapse.svelte";
        import TitleServicesCollapse from "../../components/TitleServicesCollapse.svelte";
        import { headingsTab } from "../../lib/storeAdvertisement.js";
        import { onMount } from "svelte";

        import { collection, getDocs } from "firebase/firestore";
        import { db } from "../../lib/firebase.js";

        async function fetchJsonServicesData() {
                try {
                        const jsonDataCollection = collection(db, "jsonAdvertisement");
                        const querySnapshot = await getDocs(jsonDataCollection);
                        let tempJsonServices = [];

                        querySnapshot.forEach((doc) => {
                                const data = doc.data();
                                tempJsonServices.push(data);
                        });

                        headingsTab.set(tempJsonServices); // Mettre à jour le store avec les données récupérées
                } catch (error) {
                        console.error("Error fetching JSON services data:", error);
                }
        }

        fetchJsonServicesData();

        let headings = [];

        // Surveiller le store pour les mises à jour
        headingsTab.subscribe((value) => {
                headings = value;
        });

        // Assurez-vous de récupérer les données lors du montage du composant
        onMount(() => {
                fetchJsonServicesData();
        });
</script>

<section id="advertisement">
        {#each headings as town}
                <h2>{town.ville}</h2>
                <TitleCollapse title={town.title.serviceTitle}>
                        {#each town.services as service}
                                <TitleServicesCollapse type={service.type}>
                                        {#each service.annonces as annonce}
                                                <ServicesCollapse adress={annonce.adress} advertiser={annonce.advertiser} slogan={annonce.slogan} description={annonce.description} img={annonce.img} />
                                        {/each}
                                </TitleServicesCollapse>
                        {/each}
                </TitleCollapse>
        {/each}
</section>

<style>
section {
                height: 100vh;
        }

        h2 {
                font-size: 1.5rem;
                font-weight: 700;
                margin: 1rem 0;
                text-align: center;
        }
</style> -->




<h1>Advertisement</h1>