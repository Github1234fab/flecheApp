<script>
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    export let jsonDataByDate;
    export let startDate = "";
    export let endDate = "";
    export let filterLieu = "";
    export let type = ""; // Champ pour le type d'évènement
    export let filteredEvents = writable([]);

    let OpenFilter = false;

    const types = ["brocante", "foire", "café philo", "concert", "conférence", "concours photo", "lecture contes"];

    function applyFilter() {
        let filtered = [];
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        for (const [date, events] of Object.entries(jsonDataByDate)) {
            const currentDate = new Date(date);
            if ((start && currentDate < start) || (end && currentDate > end)) {
                continue;
            }

            events.forEach((event) => {
                const matchesLieu = filterLieu ? event.lieu?.toLowerCase().includes(filterLieu.toLowerCase()) : true;
                const matchesType = type ? event.type?.toLowerCase() === type.toLowerCase() : true;

                if (matchesLieu && matchesType) {
                    filtered.push(event);
                }
            });
        }

        filteredEvents.set(filtered);
    }

    function resetFilters() {
        startDate = "";
        endDate = "";
        filterLieu = "";
        type = "";
        applyFilter(); // Réapplique le filtre avec les valeurs réinitialisées
    }
</script>

<section>
<button class={OpenFilter ? "active" : "inactive"} on:click={() => (OpenFilter = !OpenFilter)}>Filtres</button>

{#if OpenFilter}
    <div class="wrapper-inputs" transition:fade={{ duration: 1000 }}>
        <label>
            Lieu :
            <input type="text" bind:value={filterLieu} placeholder="Filtrer par lieu" />
            <button on:click={() => (filterLieu = "")}>Effacer</button>
        </label>
        <label>
            Type :
            <select bind:value={type}>
                <option value="">Tous les types</option>
                {#each types as t}
                    <option value={t}>{t}</option>
                {/each}
            </select>
            <button on:click={() => (type = "")}>Effacer</button>
        </label>
        <label>
            Date de début :
            <input type="date" bind:value={startDate} />
            <button on:click={() => (startDate = "")}>Effacer</button>
        </label>
        <label>
            Date de fin :
            <input type="date" bind:value={endDate} />
            <button on:click={() => (endDate = "")}>Effacer</button>
        </label>
        <div class="wrapper-buttons-apply">
            <button class="buttons-apply" on:click={applyFilter}>Appliquer </button>
            <button class="buttons-apply" on:click={resetFilters}>Réinitialiser </button>
        </div>
    </div>
{/if}
</section>
<style>
section{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: auto;
     
}
    .wrapper-inputs {
        display: flex;
        width: auto;
        height: auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border: 1px solid pink;
        border-radius: 8px;
        padding: 5px;
        margin-bottom: 10px;
        gap: 5px;
    }
    input,
    select {
        flex-grow: 1;
        padding: 4px;
        min-width: auto;
        padding: 5px 5px;
        border-radius: 8px;
        border: 1px solid pink;
    }
    button {
        color: black;
        padding: 4px;
        min-width: auto;
        padding: 5px 5px;
        border-radius: 8px;
        border: 1px solid pink;
        background-color: rgb(236, 236, 236);
    }
    .buttons-apply {
        color: black;
        padding: 4px;
        min-width: auto;
        padding: 10px 15px;
        border-radius: 8px;
        border: 1px solid pink;
        background-color: #32cd3292;
        font-weight: 600;
    }
    .wrapper-buttons-apply {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 20px;
    }
    .active {
        background-color: #84f384;
             padding: 10px;
          margin-bottom: 3px;
    }
    .inactive {
        background-color: #32cd32;
          padding: 10px;
          margin-bottom: 3px;
    }
</style>
