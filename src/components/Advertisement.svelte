<script>
  import TitleCollapse from "../components/TitleCollapse.svelte";
  import ServicesCollapse from "../components/ServicesCollapse.svelte";
  import { headingsTab } from "../lib/storeAdvertisement.js";
  import { onMount } from 'svelte';

  let headings = [];

  // Surveiller le store pour les mises à jour
  headingsTab.subscribe(value => {
    headings = value;
  });

  // Assurez-vous de récupérer les données lors du montage du composant
  onMount(() => {
    fetchJsonServicesData();
  });
</script>

<section id="annonces">
  {#each headings as town}
    <h2>{town.ville}</h2>
    <TitleCollapse title={town.title.serviceTitle}>
      {#each town.services as service}
        <TitleCollapse title={service.type}>
          {#each service.annonces as annonce}
            <ServicesCollapse
              adress={annonce.adress}
              advertiser={annonce.advertiser}
              slogan={annonce.slogan}
              description={annonce.description}
              img={annonce.img}
            />
          {/each}
        </TitleCollapse>
      {/each}
    </TitleCollapse>
  {/each}
</section>


<style>
        /* h1 {
                font-size: 2rem;
                font-weight: 800;
                margin: 1rem 0;
        } */
        /* h2  {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1rem 0;
  } */
</style>
