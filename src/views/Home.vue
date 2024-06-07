// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';
import { useAuthStore } from '@/stores/auth';
import MenuSelection from '@/components/calc/MenuSelection.vue';
import PopulationSummary from '@/components/calc/PopulationSummary.vue';
import SearchResultsCities from '@/components/calc/SearchResultsCities.vue';
import SearchResultsRegions from '@/components/calc/SearchResultsRegions.vue';
import { useRouter } from 'vue-router';

const populationStore = usePopulationStore();
const authStore = useAuthStore();
const router = useRouter();
const selectedSex = computed(() => populationStore.selectedSex);

function logout() {
  authStore.logout();
  location.reload();
}

function goToUserProfile() {
  router.push({ name: 'UserProfile' });
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
        <button class="user-button" @click="goToUserProfile">{{ authStore.user }}</button>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </div>
    <div class="container-home">
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

