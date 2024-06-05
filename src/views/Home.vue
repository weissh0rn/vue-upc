// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';
import MenuSelection from '@/components/calc/MenuSelection.vue';
import PopulationSummary from '@/components/calc/PopulationSummary.vue';

const populationStore = usePopulationStore();

const filterPopulationCities = computed(() => {
  populationStore.filterPopulationDataCities();
  return populationStore.filteredPopulationDataCities;
});

const filterPopulationRegion = computed(() => {
  populationStore.filterPopulationDataRegions();
  return populationStore.filteredPopulationDataRegions;
});

onMounted(() => {
  populationStore.loadInitialData();
});
</script>

<template>
  <div class="container">
    <MenuSelection />
    <PopulationSummary />
    <div>
      <h3>Результати пошуку по містах:</h3>
      <ul>
        <li v-for="item in filterPopulationCities" :key="item.id">
          Age: {{ item.age }}, Both Sexes: {{ item.both_sexes }}, Males: {{ item.males }},
          Females: {{ item.females }}, Region: {{ item.region }},
          Type: {{ item.type }}, City: {{ item.city }}, Wave: {{ item.wave }}
        </li>
      </ul>
    </div>
    <div>
      <h3>Результати пошуку по регіонах:</h3>
      <ul>
        <li v-for="item in filterPopulationRegion" :key="item.id">
          Age: {{ item.age }}, Both Sexes: {{ item.both_sexes }}, Males: {{ item.males }},
          Females: {{ item.females }}, Region: {{ item.region }},
          Type: {{ item.type }}, City: {{ item.city }}, Wave: {{ item.wave }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px;
  background-color: #f0f0f0;
  margin: 2px 0;
  border-radius: 5px;
}
</style>

