<script>
        import Filter from "../components/Filter.svelte";
        import { onMount } from "svelte";
        import { jsonDataByDate, selectedDate } from "../lib/store.js";
        import { writable, get } from "svelte/store";
        import Collapse from "../components/Collapse.svelte";

        let startDate = "";
        let endDate = "";
        let filterLieu = "";
        let type = "";

        let currentDate = writable(new Date());
        let today = new Date();
        let days = [];
        let eventsForSelectedDay = writable([]);
        let filteredEvents = writable([]);
        let dataLoaded = writable(false);

        function loadDays(date) {
                const year = date.getFullYear();
                const month = date.getMonth();
                const firstDayOfMonth = new Date(year, month, 1);
                const lastDayOfMonth = new Date(year, month + 1, 0);
                const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
                const endDay = lastDayOfMonth.getDay() === 0 ? 6 : lastDayOfMonth.getDay() - 1;

                days = [];

                for (let i = startDay; i > 0; i--) {
                        days.push(new Date(year, month, 1 - i));
                }

                for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
                        days.push(new Date(year, month, i));
                }

                for (let i = 1; i < 7 - endDay; i++) {
                        days.push(new Date(year, month + 1, i));
                }
        }

        function handleDayClick(day) {
                const adjustedDay = adjustForTimezone(day);
                selectedDate.set(adjustedDay);
                const selectedDateISO = adjustedDay.toISOString().slice(0, 10);
                const events = get(jsonDataByDate)[selectedDateISO] || [];
                eventsForSelectedDay.set(events);
        }

        function goToNextMonth() {
                const date = get(currentDate);
                date.setMonth(date.getMonth() + 1);
                currentDate.set(new Date(date));
                loadDays(date);
        }

        function goToPreviousMonth() {
                const date = get(currentDate);
                date.setMonth(date.getMonth() - 1);
                currentDate.set(new Date(date));
                loadDays(date);
        }

        function adjustForTimezone(date) {
                const adjustedDate = new Date(date);
                adjustedDate.setHours(adjustedDate.getHours() - adjustedDate.getTimezoneOffset() / 60);
                return adjustedDate;
        }

        onMount(() => {
                loadDays(get(currentDate));

                const unsubscribe = jsonDataByDate.subscribe((data) => {
                        if (Object.keys(data).length > 0) {
                                const todayISO = today.toISOString().slice(0, 10);
                                const initialEvents = data[todayISO] || [];
                                eventsForSelectedDay.set(initialEvents);
                                filteredEvents.set(initialEvents);
                                dataLoaded.set(true);
                                unsubscribe();
                        }
                });
        });

        $: if (dataLoaded) {
                selectedDate.subscribe((date) => {
                        const selectedDateISO = date.toISOString().slice(0, 10);
                        const events = get(jsonDataByDate)[selectedDateISO] || [];
                        eventsForSelectedDay.set(events);
                        filteredEvents.set(events); // Mettre à jour les événements filtrés
                });
        }
</script>

<div class="wrapper-month-display">
        <p class="currentMonth">
                {$currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        </p>
        <div>
                <button class="button-mont-select" on:click={goToPreviousMonth}><i class="fa-solid fa-angle-left"></i></button>
                <button class="button-mont-select" on:click={goToNextMonth}><i class="fa-solid fa-angle-right"></i></button>
        </div>
</div>

{#if $dataLoaded}
        <div class="calendar">
                {#each days as day}
                        <button
                                class="day
          {day.getMonth() !== $currentDate.getMonth() ? 'other-month' : ''}
          {adjustForTimezone(day).toISOString().slice(0, 10) === $selectedDate.toISOString().slice(0, 10) ? 'selected' : ''}
          {day.toDateString() === today.toDateString() ? 'today' : ''}
          {get(jsonDataByDate) && get(jsonDataByDate)[adjustForTimezone(day).toISOString().slice(0, 10)] ? 'tag-data' : ''}"
                                on:click={() => handleDayClick(day)}
                        >
                                {day.getDate()}
                        </button>
                {/each}
        </div>

        <!-- Interface utilisateur pour les filtres   -->
        <Filter jsonDataByDate={$jsonDataByDate} {startDate} {endDate} {type} {filterLieu} bind:filteredEvents />
        <div class="event-info">
                <div class="wrapper-collapse">
                        {#each $filteredEvents as event}
                                <Collapse annonceur={event.annonceur} date={event.date} lieu={event.lieu} tarif={event.tarif} fin={event.fin} début={event.début} type={event.type} />
                        {/each}
                </div>
                <p class="current-date-display">
                        Date selectionnée: {$selectedDate.toISOString().slice(0, 10)}
                </p>
                <p class="number-events">{$filteredEvents.length} événement(s) prévu(s) pour cette date.</p>
        </div>
{:else}
        <p>Chargement des données...</p>
{/if}

<style>
        .wrapper-collapse {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
                max-width: 60%;
        }
        .button-mont-select {
                background-color: var(--colorA);
        }
        button.tag-data::after {
                position: absolute;
                content: "*";
                background-color: rgb(97, 73, 250);
                width: 30%;
                height: 30%;
                transform: rotate(45deg);
                top: -20%;
                left: 80%;
                z-index: 2;
        }
        button {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: center;
                cursor: pointer;
                position: relative;
                z-index: 0;
                overflow: hidden;
        }
        .wrapper-month-display {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 0.5rem;
                gap: 10px;
        }
        .currentMonth {
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
                text-transform: capitalize;
                margin-top: 1rem;
        }

        .event-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                height: 100vh;
                padding: 30px;
                margin-top: 0px auto;
                width: auto;
                border-radius: 8px;
                background: linear-gradient(25deg, rgb(180, 152, 167), rgb(228, 197, 213));
        }

        .calendar {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
                padding: 30px;
        }
        .day {
                padding: 10px;
                text-align: center;
                cursor: pointer;
        }
        .selected {
                background-color: #28a745; /* Vert pour la date sélectionnée */
                color: white;
        }
        .other-month {
                color: #ccc;
        }
        .today {
                background-color: yellow;
                color: black;
                font-weight: bold;
                border: 1px solid grey;
        }
        .calendar .day:nth-child(7n + 6),
        .calendar .day:nth-child(7n + 7) {
                background-color: pink;
                color: black;
                font-weight: 600;
        }
</style>
