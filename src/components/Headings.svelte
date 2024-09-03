<script>
        export let headingName;
        // export let service;
</script>


<section>
<h1>{headingName}</h1>
<!-- <h3>{service}</h3> -->
</section>

<style>

        section{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 10px;

        }
        section h1{
                font-size: 1.5em;
                color: #333;
                text-align: center;
                line-height: 25px;
                font-weight: 600;
        }
</style>


