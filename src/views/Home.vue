// Home.vue
<script setup>
import { onMounted, computed } from 'vue';
import { usePopulationStore } from '@/components/calc/population.js'; // Перевірте шлях

const populationStore = usePopulationStore();

const waves = computed(() => populationStore.uniqueWaves);
const displayData = computed(() => populationStore.populationData);

// Створення computed property для отримання унікальних даних про міста
const uniqueCities= computed(() => {
  return populationStore.uniqueCities;
});

// Створення computed property для отримання унікальних даних про регіони
const uniqueRegions= computed(() => {
  return populationStore.uniqueRegions;
});

// Створення computed property для отримання унікальних даних про вік
const uniqueAges = computed(() => {
  return populationStore.uniqueAges;
});

// Створення computed property для отримання унікальних типів населення
const uniqueTypes = computed(() => {
  return populationStore.uniqueTypes;
});

// Створення computed property для отримання опцій статі
const sexOptions = computed(() => {
  return populationStore.sexOptions;
});

onMounted(() => {
  populationStore.loadInitialData();
});

</script>

<template>
  <div class="container">
    <div class="list-container">

      <div class="cities">
        <h3>Select City</h3>
				<select>
					<option v-for="city in uniqueCities" :key="city" :value="city">
					{{ city }}
					</option>
				</select>
      </div>

      <div class="regions">
        <h3>Select Region</h3>
				<select>
					<option v-for="region in uniqueRegions" :key="region" :value="region">
					{{ region }}
					</option>
				</select>
      </div>

      <div class="ages">
        <h3>Select Age</h3>
				<select>
					<option v-for="age in uniqueAges" :key="age" :value="age">
					{{ age }}
					</option>
				</select>
      </div>

      <div class="types">
				<h3>Select Population Type:</h3>
				<select>
					<option v-for="type in uniqueTypes" :key="type" :value="type">
					{{ type }}
					</option>
				</select>
			</div>

			<div class="sexs">
				<h3>Select Sex:</h3>
				<select>
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

		<div>
			<h3>Population Data:</h3>
			<ul>
				<li v-for="item in displayData" :key="item.id">
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

