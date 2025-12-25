<script setup>
    const props = defineProps({
        color: {
            type: String,
            required: true
        }
    })

</script>

<template>
    <div class="alerta" :class="props.color">
        <slot></slot>
    </div>
</template>

<style>
    .alerta {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--blanco);
        text-transform: uppercase;
        font-weight: 700;
        font-size: 1.4rem;
        padding: .5rem;
        border-radius: 2rem 2rem 0 0;
    }

        /* Clases dinámicas */
    .alerta.green {
        background-color: #0cb387;
    }

    .alerta.red {
        background-color: #8e2424;
    }
    .alerta.orange{
        background-color: #d08700;
    }
</style>