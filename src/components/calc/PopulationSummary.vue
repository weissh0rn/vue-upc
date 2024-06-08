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

const selectedData = computed(() => {
  if (props.selectedSex === 'females') {
    return {
      sex: 'Жінки',
      cities: totalFemalesCities.value,
      regions: totalFemalesRegions.value,
      total: totalFemalesCities.value + totalFemalesRegions.value
    };
  } else if (props.selectedSex === 'males') {
    return {
      sex: 'Чоловіки',
      cities: totalMalesCities.value,
      regions: totalMalesRegions.value,
      total: totalMalesCities.value + totalMalesRegions.value
    };
  } else if (props.selectedSex === 'both_sexes') {
    return {
      sex: 'Разом',
      cities: totalBothSexesCities.value,
      regions: totalBothSexesRegions.value,
      total: totalBothSexesCities.value + totalBothSexesRegions.value
    };
  }
  return {};
});

watch(() => props.selectedSex, (newValue) => {
  console.log('Selected sex changed:', newValue);
});
</script>

<template>
  <div class="summary-table-container">
    <label>Населення:</label>
    <table class="summary-table">
      <tbody>
        <tr>
          <td>Стать</td>
          <td>{{ selectedData.sex }}</td>
        </tr>
        <tr>
          <td>Міста</td>
          <td>{{ selectedData.cities }}</td>
        </tr>
        <tr>
          <td>Регіони</td>
          <td>{{ selectedData.regions }}</td>
        </tr>
        <tr>
          <td>Загальне</td>
          <td>{{ selectedData.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

