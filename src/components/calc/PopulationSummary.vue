// PopulationSummary.vue
<script setup>
import { computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';

const populationStore = usePopulationStore();

const totalBothSexesCities = computed(() => populationStore.totalBothSexesCities);
const totalMalesCities = computed(() => populationStore.totalMalesCities);
const totalFemalesCities = computed(() => populationStore.totalFemalesCities);

const totalBothSexesRegions = computed(() => populationStore.totalBothSexesRegions);
const totalMalesRegions = computed(() => populationStore.totalMalesRegions);
const totalFemalesRegions = computed(() => populationStore.totalFemalesRegions);
</script>

<template>
  <div class="summary-table">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Міста</th>
          <th>Регіони</th>
          <th>Загальне</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Жінки</td>
          <td>{{ totalFemalesCities }}</td>
          <td>{{ totalFemalesRegions }}</td>
          <td>{{ totalFemalesCities + totalFemalesRegions }}</td>
        </tr>
        <tr>
          <td>Чоловіки</td>
          <td>{{ totalMalesCities }}</td>
          <td>{{ totalMalesRegions }}</td>
          <td>{{ totalMalesCities + totalMalesRegions }}</td>
        </tr>
        <tr>
          <td>Разом</td>
          <td>{{ totalBothSexesCities }}</td>
          <td>{{ totalBothSexesRegions }}</td>
          <td>{{ totalBothSexesCities + totalBothSexesRegions }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.summary-table {
  margin-top: 20px;
  width: 20%;
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
  font-size: 0.9em; /* Зменшуємо розмір тексту */
}

td {
  text-align: center;
  font-size: 0.9em; /* Зменшуємо розмір тексту */
}
</style>

