// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

const populationStore = usePopulationStore();

const filterPopulationCities = computed(() => {
  populationStore.filterPopulationDataCities();
  return populationStore.filteredPopulationDataCities;
});

const filterPopulationRegion = computed(() => {
  populationStore.filterPopulationDataRegions();
  return populationStore.filteredPopulationDataRegions;
});

const uniqueCities = computed(() => populationStore.uniqueCities);
const uniqueRegions = computed(() => populationStore.uniqueRegions);
const uniqueAges = computed(() => populationStore.uniqueAges);
const uniqueTypes = computed(() => populationStore.uniqueTypes);
const sexOptions = computed(() => populationStore.sexOptions);
const waves = computed(() => populationStore.uniqueWaves);

const totalBothSexesCities = computed(() => populationStore.totalBothSexesCities);
const totalMalesCities = computed(() => populationStore.totalMalesCities);
const totalFemalesCities = computed(() => populationStore.totalFemalesCities);

const totalBothSexesRegions = computed(() => populationStore.totalBothSexesRegions);
const totalMalesRegions = computed(() => populationStore.totalMalesRegions);
const totalFemalesRegions = computed(() => populationStore.totalFemalesRegions);

function clearSelections() {
  populationStore.clearSelections();
}

onMounted(() => {
  populationStore.loadInitialData();
});
</script>

<template>
  <div class="container">
    <div class="list-container">

      <div class="selectors">
        <div class="cities">
          <label for="city-select">Select Cities</label>
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
          <label for="region-select">Select Regions</label>
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
          <label>Select Age</label>
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
              placeholder="From"
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
              placeholder="To"
            />
          </div>
        </div>

        <div class="types">
          <label for="type-select">Select Type</label>
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
          <label for="sex-select">Select Sex</label>
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
          <label for="wave-select">Available Waves</label>
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
    </div>

    <div class="container">
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
  justify-content: space-around; /* рівномірно розподіляємо контент по горизонталі */
  align-items: start; /* вирівнювання елементів на початку по вертикалі */
  flex-wrap: wrap; /* дозволяємо елементам обгортатися, якщо недостатньо місця */
}

.selectors {
  display: flex;
  flex-direction: column;
  width: 20%; /* встановлюємо ширину блоку на 20% від розміру екрана */
}

.cities, .regions, .ages, .types, .sexs, .waves {
  flex: 1; /* обидва блоки займають однакову частину простору в контейнері */
  margin: 3px; /* відступ між блоками */
}

.age-selectors {
  display: flex;
  justify-content: space-between; /* розміщення полів в одну лінію */
}

.age-selectors .custom-select {
  flex: 1; /* рівномірний розподіл ширини */
  margin-right: 5px; /* відступ між полями */
  max-width: calc(50% - 5px); /* обмеження ширини поля */
}

.age-selectors .custom-select:last-child {
  margin-right: 0; /* прибираємо відступ для останнього поля */
}

ul {
  list-style-type: none; /* видаляємо стандартні маркери списку */
  padding: 0; /* видаляємо відступи всередині списку */
}

li {
  padding: 5px; /* додаємо невеликі відступи для кожного елемента списку */
  background-color: #f0f0f0; /* легкий фон для елементів списку */
  margin: 2px 0; /* відступи між елементами списку */
  border-radius: 5px; /* округлені кути для елементів */
}

.custom-select .vs__dropdown-menu {
  max-height: 300px; /* максимальна висота випадаючого меню */
  overflow-y: auto; /* вертикальна прокрутка */
  max-width: 100%; /* максимальна ширина випадаючого меню */
}

.custom-select .vs__selected-options {
  background-color: #f5f5f5; /* фон для вибраних опцій */
  border: 1px solid #555; /* рамка */
  border-radius: 4px; /* округлені кути */
  padding: 5px; /* відступи всередині */
}

.custom-select .vs__dropdown-toggle {
  background-color: #fff; /* фон для кнопки */
  border: 1px solid #555; /* рамка */
  border-radius: 4px; /* округлені кути */
  padding: 5px; /* відступи всередині */
}

.custom-select .vs__dropdown-option--selected {
  background-color: #e0e0e0; /* фон для вибраних опцій у випадаючому меню */
}

.custom-select .vs__dropdown-option--hover {
  background-color: #d0d0d0; /* фон для опцій при наведенні */
}

.clear-button {
  padding: 10px 20px; /* змінює розміри кнопки */
  font-size: 16px; /* змінює розмір шрифту */
  background-color: #007bff; /* колір фону */
  color: #fff; /* колір тексту */
  border: none; /* видаляє рамку */
  border-radius: 4px; /* округлені кути */
  cursor: pointer; /* курсор у вигляді руки */
  margin-top: 10px; /* відступ зверху */
  width: 100%; /* встановлює ширину на весь контейнер */
}

.clear-button:hover {
  background-color: #0056b3; /* змінює колір фону при наведенні */
}
</style>

