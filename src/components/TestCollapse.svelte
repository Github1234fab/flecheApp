<script>import Collapse from "../components/Collapse.svelte";</script>


<section>
        <div class="A"></div>
        <Collapse/>
        <!-- <div class="B"></div> -->
</section>


<style>
        section{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100vw;
                height: 100vh;
        }
        .A{
                background-color: red;
                height: 100px;
                width: 100%;
        }
        /* .B{
                background-color: blue;
                height: 500px;
                width: 100%;
        } */


</style>


