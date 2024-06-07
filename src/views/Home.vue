// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';
import { useAuthStore } from '@/stores/auth';
import MenuSelection from '@/components/calc/MenuSelection.vue';
import PopulationSummary from '@/components/calc/PopulationSummary.vue';
import SearchResultsCities from '@/components/calc/SearchResultsCities.vue';
import SearchResultsRegions from '@/components/calc/SearchResultsRegions.vue';

const populationStore = usePopulationStore();
const authStore = useAuthStore();
const selectedSex = computed(() => populationStore.selectedSex);

function logout() {
  authStore.logout();
  location.reload();
}

onMounted(() => {
  populationStore.loadInitialData();
});
</script>

<template>
  <div>
    <div class="header">
      <div class="header-title">
        Ukraine Population Calculator
      </div>
      <div class="user-info">
        <button class="user-button">{{ authStore.user }}</button>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </div>
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
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #668cff;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.user-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 15px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 5px;
}

.user-button:hover {
  background-color: #0056b3;
}

.logout-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 5px;
}

.logout-button:hover {
  background-color: #0056b3;
}

.container {
  display: flex;
  width: 100%;
  height: 100vh; /* Висота екрану */
  padding-top: 50px; /* Додаємо відступ, щоб контент не заходив під заголовок */
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

