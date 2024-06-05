// SearchResultsRegions.vue
<script setup>
import { computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';

const populationStore = usePopulationStore();

const filterPopulationRegion = computed(() => {
  populationStore.filterPopulationDataRegions();
  return populationStore.filteredPopulationDataRegions;
});
</script>

<template>
  <div class="results-table">
    <label>Результати пошуку по регіонах:</label>
    <table>
      <thead>
        <tr>
          <th>Вік</th>
          <th>Регіон</th>
          <th>Тип населення</th>
          <th>Жінки</th>
          <th>Чоловіки</th>
          <th>Разом</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterPopulationRegion" :key="item.id">
          <td>{{ item.age }}</td>
          <td>{{ item.region }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.females }}</td>
          <td>{{ item.males }}</td>
          <td>{{ item.both_sexes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.results-table {
  width: 100%; 
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

td {
  text-align: center;
  font-size: 1.0em; 
}
</style>

