<template>
    <div>
        <div v-if="pokemon">
            <div class="w-4/6 mx-auto rounded-xl shadow-lg">
                <h1 class="font-black md:text-3xl text-xt text-red-900">{{ pokemon.name }}</h1>
                <span 
                    v-for="type in types" :key="type.id"
                    class="py-1 px-2 shadow-md rounded-full text-white bg-red-500 mr-2 mt-3 font-semibold mb-2">
                    {{ type }}
                </span>
                
                <div class="flex flex-wrap">
                    <div class="flex-1 grid place-items-center">
                        <img
                            class="w-48 h-48"
                            :src="pokemon.sprites.front_default"
                            :alt="`image of ${pokemon.name}`"
                        >
                    </div>
                    <div class="flex-1 mt-5">
                        <button 
                            @click="changeChart()"
                        >
                            {{ isBarChart ? 'Radar' : 'Bar' }} Stats
                        </button>
                        <!-- {{ isBarChart }} -->
                        <!-- <bar-chart :stats="stats" /> -->
                        <component
                            :is="isBarChart ? BarChart : RadarChart"
                            :stats="stats"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No hay nada</p>
        </div>
    </div>
</template>





<script setup>
import { useRoute } from 'vue-router'
import { reactive, toRefs, computed, ref, onMounted, watch } from 'vue'
import BarChart from '../components/BarChart.vue';
import RadarChart from '../components/RadarChart.vue';
// import RadarChart from '../components/RadarChart.vue';

const state = reactive({
    pokemon: null,
    stats: computed( () => filterStats() ),
    types: computed( () => filterTypes() )
})

function filterStats() {
    if (state.pokemon) {
        return state.pokemon.stats.map( stat => stat.base_stat )
    }
}

function filterTypes() {
    if (state.pokemon) {
        return state.pokemon.types.map( type => type.type.name )
    }
}


const route = useRoute()
const { pokemon, stats, types } = toRefs(state)
const getData = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            state.pokemon = data
        })
}

onMounted( () => getData() )

watch( route, () => getData() )

// change chart's graphics
const isBarChart = ref(true)

const changeChart = () => isBarChart.value = !isBarChart.value

</script>




<style lang="scss">
    
</style>