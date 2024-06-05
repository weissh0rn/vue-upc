// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';
import MenuSelection from '@/components/calc/MenuSelection.vue';

const populationStore = usePopulationStore();

const filterPopulationCities = computed(() => {
  populationStore.filterPopulationDataCities();
  return populationStore.filteredPopulationDataCities;
});

const filterPopulationRegion = computed(() => {
  populationStore.filterPopulationDataRegions();
  return populationStore.filteredPopulationDataRegions;
});

const totalBothSexesCities = computed(() => populationStore.totalBothSexesCities);
const totalMalesCities = computed(() => populationStore.totalMalesCities);
const totalFemalesCities = computed(() => populationStore.totalFemalesCities);

const totalBothSexesRegions = computed(() => populationStore.totalBothSexesRegions);
const totalMalesRegions = computed(() => populationStore.totalMalesRegions);
const totalFemalesRegions = computed(() => populationStore.totalFemalesRegions);

onMounted(() => {
  populationStore.loadInitialData();
});
</script>

<template>
  <div class="container">
    <MenuSelection />
    <div class="list-container">
      <div>
        <h4>Загальне населення по містах:</h4>
        <ul>
          <li>Обидві статі: {{ totalBothSexesCities }}</li>
          <li>Чоловіки: {{ totalMalesCities }}</li>
          <li>Жінки: {{ totalFemalesCities }}</li>
        </ul>
      </div>

      <div>
        <h4>Загальне населення по регіонах:</h4>
        <ul>
          <li>Обидві статі: {{ totalBothSexesRegions }}</li>
          <li>Чоловіки: {{ totalMalesRegions }}</li>
          <li>Жінки: {{ totalFemalesRegions }}</li>
        </ul>
      </div>

      <div>
        <h4>Загальні дані населення:</h4>
        <ul>
          <li>Обидві статі: {{ totalBothSexesCities + totalBothSexesRegions }}</li>
          <li>Чоловіки: {{ totalMalesCities + totalMalesRegions }}</li>
          <li>Жінки: {{ totalFemalesCities + totalFemalesRegions }}</li>
        </ul>
      </div>
    </div>

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
.list-container {
  display: flex;
  justify-content: space-around;
  align-items: start;
  flex-wrap: wrap;
}

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

