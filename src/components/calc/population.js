// population.js
import { defineStore } from 'pinia';

export const usePopulationStore = defineStore('population', {
  state: () => ({
		// The full list of the cities, regions, ages, types and waves
    uniqueCities: [],
    uniqueRegions: [],
    uniqueAges: [],
    uniqueTypes: [],
    uniqueWaves: [],
		// The full population data list
    populationData: [],
    // Save filtered data
    filteredPopulationDataCities: [],
    filteredPopulationDataRegion: [],
		// The selected data of the cities, regions ...
    selectedCities: [],
    selectedRegions: [],
		selectedAgeFrom: null,
		selectedAgeTo: null,
    selectedSex: null,
    selectedType: null,
    selectedWaves: null,
    sexOptions: {
      both_sexes: "Обидві статі",
      males: "Чоловіки",
      females: "Жінки"
    },
  }),

  actions: {
    async loadInitialData() {
      try {
        const response = await fetch('/population.json');
        const data = await response.json();
        this.setPopulationData(data);
        this.updateUniqueCities(data);
        this.updateUniqueRegions([...new Set(data.map(item => item.region))]);
        this.updateUniqueAges([...new Set(data.map(item => item.age))]);
        this.updateUniqueTypes([...new Set(data.map(item => item.type))]);
        this.updateUniqueWaves([...new Set(data.map(item => item.wave))]);
      } catch (error) {
        console.error('Failed to load population data:', error);
      }
    },

    // Функція для фільтрації populationData за обраними параметрами та зберігання результату
    filterPopulationDataCities() {
      const selectedCities = this.selectedCities;
      const selectedAgeFrom = this.selectedAgeFrom;
      const selectedAgeTo = this.selectedAgeTo;

      // Фільтруємо дані відповідно до обраних параметрів
      this.filteredPopulationDataCities = this.populationData.filter(item => {
        let matchCities = !selectedCities.length || selectedCities.includes(item.city);
        let matchAge = (!selectedAgeFrom || item.age >= selectedAgeFrom) && (!selectedAgeTo || item.age <= selectedAgeTo);

        return matchCities && matchAge;
      });
    },

    // Функція для фільтрації populationData для регіонів:
    filterPopulationDataRegion() {
      const selectedRegions = this.selectedRegions;
      const selectedAgeFrom = this.selectedAgeFrom;
      const selectedAgeTo = this.selectedAgeTo;
      const selectedType = this.selectedType;

      // Filter the data based on selected parameters
      this.filteredPopulationDataRegion = this.populationData.filter(item => {
        let matchRegions = !selectedRegions.length || selectedRegions.includes(item.region);
        let matchAge = (!selectedAgeFrom || item.age >= selectedAgeFrom) && (!selectedAgeTo || item.age <= selectedAgeTo);
        let matchType = !selectedType || item.type === selectedType;

        return matchRegions && matchAge && matchType;
      });
    },

    setPopulationData(data) {
      this.populationData = data;
    },

    updateUniqueCities(data) {
      const filteredCities = data.map(item => item.city).filter(city => city.toLowerCase() !== "none");
      this.uniqueCities = [...new Set(filteredCities)];
    },
    updateUniqueRegions(regions) {
      this.uniqueRegions = regions;
    },
    updateUniqueAges(ages) {
      this.uniqueAges = ages;
    },
    updateUniqueTypes(types) {
      this.uniqueTypes = types;
    },
    updateUniqueWaves(waves) {
      this.uniqueWaves = waves;
    },

    setSelectedCities(cities) {
      this.selectedCities = cities;
      console.log(this.selectedCities);
    },
    setSelectedRegions(regions) {
      this.selectedRegions = regions;
      console.log(this.selectedRegions);
    },
		setSelectedAgeFrom(age) {
      this.selectedAgeFrom = age;
      console.log(this.selectedAgeFrom);
    },
    setSelectedAgeTo(age) {
      this.selectedAgeTo = age;
      console.log(this.selectedAgeTo);
    },
    setSelectedSex(sex) {
      this.selectedSex = sex;
      console.log(this.selectedSex);
    },
    setSelectedType(type) {
      this.selectedType = type;
      console.log(this.selectedType);
    },
    setSelectedWaves(waves) {
      this.selectedWaves = waves;
    },
  }
});

