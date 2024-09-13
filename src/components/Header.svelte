<script>
        import Flèche from "../assets/flècheF.png";
        import svgMenu from "../assets/svg-menu.svg";
        import { slide } from "svelte/transition";
        let menuVisible = false;
        function openCloseMenu() {
                menuVisible = !menuVisible;
        }
</script>

<header>
        <div class="wrapper-header">
                <a href="/">
                <img class="logo" src={Flèche} alt="Logo" /></a>
                <!-- <h1></h1> -->
                <button on:click={openCloseMenu}>
                        <img class="svg-menu" src={svgMenu} alt="Menu" />
                </button>
        </div>
</header>

<!-- Contenu du menu -->
<div class="menu-container">
        {#if menuVisible}
                <div class="menu" transition:slide={{ duration: 1200 }}>
                        <a href="/Advertisement">Commerces</a>
                        <a href="/publicité">Publicité</a>
                        <a href="/jsonImport">Diffusion</a>
                        <a href="/">Contact</a>
                        <!-- Ajoutez d'autres éléments de menu ici -->
                </div>
        {/if}
</div>

<style>
        header {
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
                padding: 10px;
        }
        .menu-container {
                display: flex;
                justify-content: center;
                width: 100%;
                padding: 10px;
        }

        .menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                align-content: center;
                gap: 10px;
                padding: 20px 40px;
                border-radius: 10px;
                box-shadow: 0px 0px 15px 4px rgb(0 0 0 / 10%);
        }

        .wrapper-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
        }

        .logo {
                height: 50px; /* Ajustez la taille de l'image */
        }

        .svg-menu {
                height: 30px; /* Ajustez la taille de l'icône du menu */
                cursor: pointer;
        }
        button {
                background-color: #f1f1f1;
                border: none;
                padding: 10px;
                cursor: pointer;
                margin-right: 10px;
        }
        button:hover {
                background-color: rgb(211, 211, 213);
        }

        /* h1 {
                font-size: 0.9rem;
                padding: 10px;
                font-weight: 500;
        } */
        a {
                text-decoration: none;
                color: #c71585;
        }
        a:hover {
                color: #00bfff;
        }
</style>
