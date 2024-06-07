// PopulationSummary.vue
<script setup>
import { computed, watch } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';

const props = defineProps({
  selectedSex: String
});

const populationStore = usePopulationStore();

const totalBothSexesCities = computed(() => populationStore.totalBothSexesCities);
const totalMalesCities = computed(() => populationStore.totalMalesCities);
const totalFemalesCities = computed(() => populationStore.totalFemalesCities);

const totalBothSexesRegions = computed(() => populationStore.totalBothSexesRegions);
const totalMalesRegions = computed(() => populationStore.totalMalesRegions);
const totalFemalesRegions = computed(() => populationStore.totalFemalesRegions);

watch(() => props.selectedSex, (newValue) => {
  console.log('Selected sex changed:', newValue);
});
</script>

<template>
  <div class="summary-table">
    <table>
      <thead>
        <tr>
          <th>Стать</th>
          <th>Міста</th>
          <th>Регіони</th>
          <th>Загальне</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="selectedSex === 'females'">
          <td>Жінки</td>
          <td>{{ totalFemalesCities }}</td>
          <td>{{ totalFemalesRegions }}</td>
          <td>{{ totalFemalesCities + totalFemalesRegions }}</td>
        </tr>
        <tr v-if="selectedSex === 'males'">
          <td>Чоловіки</td>
          <td>{{ totalMalesCities }}</td>
          <td>{{ totalMalesRegions }}</td>
          <td>{{ totalMalesCities + totalMalesRegions }}</td>
        </tr>
        <tr v-if="selectedSex === 'both_sexes'">
          <td>Разом</td>
          <td>{{ totalBothSexesCities }}</td>
          <td>{{ totalBothSexesRegions }}</td>
          <td>{{ totalBothSexesCities + totalBothSexesRegions }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

