// SeartchResultsCities
<script setup>
import { computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';

const populationStore = usePopulationStore();

const filterPopulationCities = computed(() => {
  populationStore.filterPopulationDataCities();
  return populationStore.filteredPopulationDataCities;
});
</script>

<template>
  <div class="results-table">
    <label>Результати пошуку по містах:</label>
    <table>
      <thead>
        <tr>
          <th>Вік</th>
          <th>Місто</th>
          <th>Тип населення</th>
          <th>Жінки</th>
          <th>Чоловіки</th>
          <th>Разом</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterPopulationCities" :key="item.id">
          <td>{{ item.age }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.females }}</td>
          <td>{{ item.males }}</td>
          <td>{{ item.both_sexes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

