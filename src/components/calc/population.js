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
    filteredPopulationDataRegions: [],
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
    // Save total population for Cities:
    totalBothSexesCities: 0,
    totalMalesCities: 0,
    totalFemalesCities: 0,
    // Save total population for Regions:
    totalBothSexesRegions: 0,
    totalMalesRegions: 0,
    totalFemalesRegions: 0,
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

    filterPopulationDataCities() {
      const selectedCities = this.selectedCities;
      const selectedAgeFrom = this.selectedAgeFrom;
      const selectedAgeTo = this.selectedAgeTo;

      // Check if selectedCities is empty
      if (selectedCities.length === 0) {
        // Set total population values to zero
        this.totalBothSexesCities = 0;
        this.totalMalesCities = 0;
        this.totalFemalesCities = 0;
        this.filteredPopulationDataCities = [];
        return;
      }

      // Filter the data based on selected parameters
      const filteredDataCities = this.populationData.filter(item => {
        let matchCities = !selectedCities.length || selectedCities.includes(item.city);
        let matchAge = (!selectedAgeFrom || item.age >= selectedAgeFrom) && (!selectedAgeTo || item.age <= selectedAgeTo);

        return matchCities && matchAge;
      });

      // Update total population values
      this.totalBothSexesCities = filteredDataCities.reduce((sum, item) => sum + item.both_sexes, 0);
      this.totalMalesCities = filteredDataCities.reduce((sum, item) => sum + item.males, 0);
      this.totalFemalesCities = filteredDataCities.reduce((sum, item) => sum + item.females, 0);

      this.filteredPopulationDataCities = filteredDataCities;
    },


    // Функція для фільтрації populationData для регіонів:
    filterPopulationDataRegions() {
      const selectedRegions = this.selectedRegions;
      const selectedAgeFrom = this.selectedAgeFrom;
      const selectedAgeTo = this.selectedAgeTo;
      const selectedType = this.selectedType;

      if (selectedRegions.length === 0) {
        // Set total population values to zero
        this.totalBothSexesRegions = 0;
        this.totalMalesRegions = 0;
        this.totalFemalesRegions = 0;
        this.filteredPopulationDataRegions = [];
        return;
      }

      // Filter the data based on selected parameters
      const filteredDataRegions = this.populationData.filter(item => {
        let matchRegions = !selectedRegions.length || selectedRegions.includes(item.region);
        let matchAge = (!selectedAgeFrom || item.age >= selectedAgeFrom) && (!selectedAgeTo || item.age <= selectedAgeTo);
        let matchType = !selectedType || item.type === selectedType;

        return matchRegions && matchAge && matchType;
      });

      // Оновлюємо загальне населення по статях для регіонів
      this.totalBothSexesRegions = filteredDataRegions.reduce((sum, item) => sum + item.both_sexes, 0);
      this.totalMalesRegions = filteredDataRegions.reduce((sum, item) => sum + item.males, 0);
      this.totalFemalesRegions = filteredDataRegions.reduce((sum, item) => sum + item.females, 0);

      this.filteredPopulationDataRegions = filteredDataRegions;
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

    clearSelections() {
      this.selectedCities = [];
      this.selectedRegions = [];
      this.selectedAgeFrom = null;
      this.selectedAgeTo = null;
      this.selectedSex = null;
      this.selectedType = null;
      this.selectedWaves = null;
      this.filterPopulationDataCities();
      this.filterPopulationDataRegions();
    },
  }
});

