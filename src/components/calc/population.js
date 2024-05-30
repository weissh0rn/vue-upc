// population.js
import { defineStore } from 'pinia';

export const usePopulationStore = defineStore('population', {
  state: () => ({
    uniqueCities: [],
    uniqueRegions: [],
    uniqueAges: [],
    uniqueTypes: [],
    uniqueWaves: [],
    populationData: [],
    selectedCities: [],
    selectedRegions: [],
    selectedSex: null,
    selectedType: null,
    selectedWaves: null,
    selectedAgeRange: { from: null, to: null },
    sexOptions: {
      both_sexes: "Обидві статі",
      males: "Чоловіки",
      females: "Жінки"
    }
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
    updateSelectedCities(cities) {
      this.selectedCities = cities;
    },
    updateSelectedRegions(regions) {
      this.selectedRegions = regions;
    },
    setSelectedSex(sex) {
      this.selectedSex = sex;
    },
    setSelectedType(type) {
      this.selectedType = type;
    },
    setSelectedWaves(waves) {
      this.selectedWaves = waves;
    },
    setSelectedAgeRange(from, to) {
      this.selectedAgeRange.from = from;
      this.selectedAgeRange.to = to;
    }
  }
});

