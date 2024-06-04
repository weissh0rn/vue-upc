// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js';

const populationStore = usePopulationStore();

// Call filterPopulationData whenever the selected parameters change
const filterPopulationCities = computed(() => {
  populationStore.filterPopulationDataCities();
  return populationStore.filteredPopulationDataCities;
});

// Call filterPopulationData whenever the selected parameters change
const filterPopulationRegion = computed(() => {
  populationStore.filterPopulationDataRegions();
  return populationStore.filteredPopulationDataRegions;
});

// Створення computed property для отримання унікальних даних з populationStore
const uniqueCities = computed(() => populationStore.uniqueCities);
const uniqueRegions = computed(() => populationStore.uniqueRegions);
const uniqueAges = computed(() => populationStore.uniqueAges);
const uniqueTypes = computed(() => populationStore.uniqueTypes);
const sexOptions = computed(() => populationStore.sexOptions);
const waves = computed(() => populationStore.uniqueWaves);

// Створення computed property для отримання загальних даних про населення з populationStore
const totalBothSexesCities = computed(() => populationStore.totalBothSexesCities);
const totalMalesCities = computed(() => populationStore.totalMalesCities);
const totalFemalesCities = computed(() => populationStore.totalFemalesCities);

// Створення computed property для отримання загальних даних про населення Regions
const totalBothSexesRegions = computed(() => populationStore.totalBothSexesRegions);
const totalMalesRegions = computed(() => populationStore.totalMalesRegions);
const totalFemalesRegions = computed(() => populationStore.totalFemalesRegions);

// Функції для збереження вибраних даних в populationStore
function saveSelectedCities(event) {
  const city = event.target.value;
  if (!populationStore.selectedCities.includes(city)) {
    populationStore.setSelectedCities([...populationStore.selectedCities, city]);
  }
}

/*
function saveSelectedRegions(event) {
  populationStore.setSelectedRegions(event.target.value);
}
*/

// Функції для збереження вибраних даних Regions в populationStore
function saveSelectedRegions(event) {
  const region = event.target.value;
  if (!populationStore.selectedRegions.includes(region)) {
    populationStore.setSelectedRegions([...populationStore.selectedRegions, region]);
  }
}

function saveSelectedAgeFrom(event) {
  populationStore.setSelectedAgeFrom(event.target.value);
}

function saveSelectedAgeTo(event) {
  populationStore.setSelectedAgeTo(event.target.value);
}

function saveSelectedType(event) {
  populationStore.setSelectedType(event.target.value);
}

function saveSelectedSex(event) {
  populationStore.setSelectedSex(event.target.value);
}

onMounted(() => {
  populationStore.loadInitialData();
});
</script>

<template>
  <div class="container">
    <div class="list-container">

			<div class="cities">
				<h3>Select City</h3>
				<select @change="saveSelectedCities($event)">
          <option disabled selected>Select City</option>
					<option v-for="city in uniqueCities" :key="city" :value="city">
					{{ city }}
					</option>
				</select>
			</div>

      <div class="regions">
        <h3>Select Region</h3>
				<select @change="saveSelectedRegions($event)">
          <option disabled selected>Select Region</option>
					<option v-for="region in uniqueRegions" :key="region" :value="region">
					{{ region }}
					</option>
				</select>
      </div>

      <div class="ages">
        <h3>Select Age</h3>
				<select @change="saveSelectedAgeFrom($event)">
          <option disabled selected>From</option>
					<option v-for="age in uniqueAges" :key="age" :value="age">
					{{ age }}
					</option>
				</select>
				<select @change="saveSelectedAgeTo($event)">
          <option disabled selected>_To_</option>
					<option v-for="age in uniqueAges" :key="age" :value="age">
					{{ age }}
					</option>
				</select>
      </div>

			<div class="types">
				<h3>Select Type:</h3>
				<select @change="saveSelectedType($event)">
          <option disabled selected>Population Type</option>
					<option v-for="type in uniqueTypes" :key="type" :value="type">
					{{ type }}
					</option>
				</select>
			</div>

			<div class="sexs">
				<h3>Select Sex:</h3>
				<select @change="saveSelectedSex($event)">
          <option disabled selected>Select Sex</option>
					<option v-for="(label, value) in sexOptions" :key="value" :value="value">
					{{ label }}
					</option>
				</select>
			</div>

			<div class="waves">
				<h3>Available Waves</h3>
				<ul>
					<li v-for="wave in waves" :key="wave">{{ wave }}</li>
				</ul>
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
            <li>Чоловіки: {{ totalMalesRegions }}</li>
            <li>Жінки: {{ totalFemalesRegions }}</li>
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

.cities, .regions, .ages, .types, .sexs, .waves {
	flex: 1; /* обидва блоки займають однакову частину простору в контейнері */
	margin: 3px; /* відступ між блоками */
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
</style>

