// MenuSelection.vue
<script setup>
import { computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const populationStore = usePopulationStore();

const uniqueCities = computed(() => populationStore.uniqueCities);
const uniqueRegions = computed(() => populationStore.uniqueRegions);
const uniqueAges = computed(() => populationStore.uniqueAges);
const uniqueTypes = computed(() => populationStore.uniqueTypes);
const sexOptions = computed(() => populationStore.sexOptions);
const waves = computed(() => populationStore.uniqueWaves);

function clearSelections() {
  populationStore.clearSelections();
}
</script>

<template>
  <div class="selectors">
    <div class="cities">
      <label for="city-select">Вибір міст:</label>
      <v-select 
        id="city-select"
        :options="uniqueCities" 
        multiple
        closeOnSelect
        :clearable="false"
        label="city"
        :reduce="city => city"
        v-model="populationStore.selectedCities"
        class="custom-select"
      />
    </div>
    
    <div class="regions">
      <label for="region-select">Вибір регіонів:</label>
      <v-select 
        id="region-select"
        :options="uniqueRegions" 
        multiple
        closeOnSelect
        :clearable="false"
        label="region"
        :reduce="region => region"
        v-model="populationStore.selectedRegions"
        class="custom-select"
      />
    </div>

    <div class="ages">
      <label>Вибір віку:</label>
      <div class="age-selectors">
        <v-select 
          id="age-from-select"
          :options="uniqueAges" 
          closeOnSelect
          :clearable="false"
          label="age"
          :reduce="age => age"
          v-model="populationStore.selectedAgeFrom"
          class="custom-select age-select"
          placeholder="Від"
        />
        <v-select 
          id="age-to-select"
          :options="uniqueAges" 
          closeOnSelect
          :clearable="false"
          label="age"
          :reduce="age => age"
          v-model="populationStore.selectedAgeTo"
          class="custom-select age-select"
          placeholder="До"
        />
      </div>
    </div>

    <div class="types">
      <label for="type-select">Вибір типу населення:</label>
      <v-select 
        id="type-select"
        :options="uniqueTypes"
        closeOnSelect
        :clearable="false"
        label="type"
        :reduce="type => type"
        v-model="populationStore.selectedType"
        class="custom-select"
      />
    </div>

    <div class="sexs">
      <label for="sex-select">Вибір статі:</label>
      <v-select 
        id="sex-select"
        :options="Object.keys(sexOptions).map(key => ({ value: key, label: sexOptions[key] }))"
        closeOnSelect
        :clearable="false"
        label="label"
        :reduce="sex => sex.value"
        v-model="populationStore.selectedSex"
        class="custom-select"
      />
    </div>

    <div class="waves">
      <label for="wave-select">Вибір оновлення:</label>
      <v-select 
        id="wave-select"
        :options="waves"
        closeOnSelect
        :clearable="false"
        label="wave"
        :reduce="wave => wave"
        v-model="populationStore.selectedWaves"
        class="custom-select"
      />
    </div>

    <button class="clear-button" @click="clearSelections">Clear</button>
  </div>
</template>

<style scoped>
/*
.selectors {
  display: flex;
  flex-direction: column;
  width: 100%; 
}

.cities, .regions, .ages, .types, .sexs, .waves {
  flex: 1;
  margin: 3px;
}

.age-selectors {
  display: flex;
  justify-content: space-between;
}

.age-selectors .custom-select {
  flex: 1;
  margin-right: 5px;
  max-width: calc(50% - 5px);
}

.age-selectors .custom-select:last-child {
  margin-right: 0;
}
*/

.custom-select .vs__dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
  max-width: 100%;
}

.custom-select .vs__selected-options {
  background-color: #c5c5c5;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 5px;
}

.custom-select .vs__dropdown-toggle {
  background-color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 5px;
}

.custom-select .vs__dropdown-option--selected {
  background-color: #a0a0a0;
}

.custom-select .vs__dropdown-option--hover {
  background-color: #909090;
}

/*
.clear-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}

.clear-button:hover {
  background-color: var(--primary-hover-color);
}
*/

/* Адаптивні стилі */
/*
@media (max-width: 768px) {
  .selectors {
    flex-direction: column;
  }

  .age-selectors {
    flex-direction: column;
  }

  .age-selectors .custom-select {
    margin-right: 0;
    max-width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 576px) {
  .cities, .regions, .ages, .types, .sexs, .waves {
    margin: 2px;
  }

  .clear-button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
*/
</style>

