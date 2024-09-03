<script>
        // export let icon;
        export let adress;
        export let advertiser;
        export let slogan;
        export let description;
        export let img;

        import { fade, slide } from "svelte/transition";

        let close = false;

        function collapse() {
                close = !close;
        }
</script>

<div class="wrapper {close ? 'active' : ''}">
        <button class="button" on:click={collapse}>
                {advertiser}
                 <span class="button-arrows">
                        {#if close}
                                <img src="moins.svg" alt="Arrow Up" in:fade={{ duration: 1200 }} />
                        {:else}
                                <img src="plus.svg" alt="Arrow Down" in:fade={{ duration: 1200 }} />
                        {/if}
                </span>
        </button>

        {#if close}
                <span class="content" transition:slide={{ duration: 1200 }}>
                        <div class="content {close ? 'less' : ''} " in:fade={{ duration: 1200 }} out:fade={{ duration: 1200 }}>
                                <p class="p">{adress}</p>
                                <p class="p">{slogan}</p>
                                <p class="p">{description}</p>
                                <img src={img} alt="" class="service-img" />
                        </div>
                </span>
        {/if}
</div>

<style>
        .wrapper {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100vw;
                gap: 3px;
        }
        .button {
                position: relative;
                display: flex;
                align-items: center;
                padding: 20px;
                font-size: 1rem;
                font-weight: 800;
                width: 70%;
                cursor: pointer;
                border: none;
                border-radius: 8px;
                background: linear-gradient( 45deg, rgb(255, 255, 255), rgb(201, 144, 12));
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
                height: auto;
                text-align: left;
                letter-spacing: -1px;
        }
        .button-arrows {
                position: absolute;
                content: "{buttonText}";
                color: rgb(100, 100, 229);
                font-size: 1em;
                font-weight: bolder;
                top: 40px;
                left: 90%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
        }
        .button-arrows img {
                height: 15px;
                width: 15px;
        }
        .button-arrows img:hover {
                animation: bounce 0.4s;
        }
        .service-img {
                width: 100%;
                height: auto;
                object-fit: cover;
                border-radius: 8px;
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
        }

        .content {
                width: 80%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 10px;
                border-radius: 5px;
                border: none;
                background-color: rgb(162, 26, 79);
        }

        .p {
                width: 100%;
                text-align: center;
                font-size: 1rem;
                font-weight: 400;
                color: white;
                padding: 6px;
                border-radius: 8px;
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
        }
        @keyframes bounce {
                0% {
                        transform: scale(1) translateY(-2px);
                }
                25% {
                        transform: scale(1) translateY(3px);
                }
                50% {
                        transform: scale(1) translateY(-1px);
                }
                75% {
                        transform: scale(1) translateY(2px);
                }
                100% {
                        transform: scale(1) translateY(0);
                }
        }

        @media screen and (max-width: 768px) {
                .wrapper {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100vw;
                }
                .button {
                        font-size: 1em;
                }

                .button-arrows {
                        right: 0px;
                        margin-top: -30px;
                }
        }
</style>
