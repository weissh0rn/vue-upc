// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';
import MenuSelection from '@/components/calc/MenuSelection.vue';
import PopulationSummary from '@/components/calc/PopulationSummary.vue';
import SearchResultsCities from '@/components/calc/SearchResultsCities.vue';
import SearchResultsRegions from '@/components/calc/SearchResultsRegions.vue';

const populationStore = usePopulationStore();

const selectedSex = computed(() => populationStore.selectedSex);

onMounted(() => {
  populationStore.loadInitialData();
});
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <MenuSelection />
      <PopulationSummary :selectedSex="selectedSex" />
    </div>
    <div class="right-panel">
      <SearchResultsCities />
      <SearchResultsRegions />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh; /* Висота екрану */
}

.left-panel {
  width: 30%; /* Ліва панель займає 30% ширини */
  padding: 10px;
  box-sizing: border-box;
}

.right-panel {
  width: 70%; /* Права панель займає 70% ширини */
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start; /* Вирівнювання по вертикалі зверху */
}
</style>

