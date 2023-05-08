<template>
    <apexchart
        width="500"
        type="bar"
        :options="options"
        :series="series"
    ></apexchart>
</template>




<script setup>
import { computed } from 'vue'

const props = defineProps({
    stats: Array
})

const options = {
    chart: {
        id: 'vuechart-example'
    },
    xaxis: {
        categories: ['PV', 'Attack', 'Defense', 'Attack SP', 'Deffense SP', 'Speed']
    }
}

const series = computed( () => {
    return [
        {
            name: "Statistics",
            data: props.stats
        }
    ]
})

 </script>






<style lang="scss">
    
</style>