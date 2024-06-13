// population.spec.js
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePopulationStore } from '@/components/calc/population.js';

describe('Population Store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePopulationStore();
  });

  it('initializes with correct state', () => {
    expect(store.uniqueCities).toEqual([]);
    expect(store.uniqueRegions).toEqual([]);
    expect(store.uniqueAges).toEqual([]);
    expect(store.uniqueTypes).toEqual([]);
    expect(store.uniqueWaves).toEqual([]);
    expect(store.populationData).toEqual([]);
    expect(store.filteredPopulationDataCities).toEqual([]);
    expect(store.filteredPopulationDataRegions).toEqual([]);
    expect(store.totalBothSexesCities).toBe(0);
    expect(store.totalMalesCities).toBe(0);
    expect(store.totalFemalesCities).toBe(0);
    expect(store.totalBothSexesRegions).toBe(0);
    expect(store.totalMalesRegions).toBe(0);
    expect(store.totalFemalesRegions).toBe(0);
  });

  it('loads initial data correctly', async () => {
    const mockData = [
      { city: 'Kyiv', region: 'Kyiv', age: 25, type: 'Urban', wave: 1, both_sexes: 10000, males: 5000, females: 5000 },
      { city: 'Lviv', region: 'Lviv', age: 30, type: 'Urban', wave: 1, both_sexes: 8000, males: 4000, females: 4000 },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    await store.loadInitialData();

    expect(store.populationData).toEqual(mockData);
    expect(store.uniqueCities).toEqual(['Kyiv', 'Lviv']);
    expect(store.uniqueRegions).toEqual(['Kyiv', 'Lviv']);
    expect(store.uniqueAges).toEqual([25, 30]);
    expect(store.uniqueTypes).toEqual(['Urban']);
    expect(store.uniqueWaves).toEqual([1]);
  });

  it('filters population data for cities correctly', () => {
    store.populationData = [
      { city: 'Kyiv', age: 25, both_sexes: 1000, males: 500, females: 500 },
      { city: 'Lviv', age: 30, both_sexes: 800, males: 400, females: 400 },
    ];

    store.setSelectedCities(['Kyiv']);
    store.setSelectedAgeFrom(20);
    store.setSelectedAgeTo(30);
    store.filterPopulationDataCities();

    expect(store.filteredPopulationDataCities).toEqual([
      { city: 'Kyiv', age: 25, both_sexes: 1000, males: 500, females: 500 }
    ]);
    expect(store.totalBothSexesCities).toBe(1000);
    expect(store.totalMalesCities).toBe(500);
    expect(store.totalFemalesCities).toBe(500);
  });

  it('filters population data for regions correctly', () => {
    store.populationData = [
      { region: 'Kyiv', age: 25, type: 'Urban', both_sexes: 1000, males: 500, females: 500 },
      { region: 'Lviv', age: 30, type: 'Urban', both_sexes: 800, males: 400, females: 400 },
    ];

    store.setSelectedRegions(['Kyiv']);
    store.setSelectedAgeFrom(20);
    store.setSelectedAgeTo(30);
    store.setSelectedType('Urban');
    store.filterPopulationDataRegions();

    expect(store.filteredPopulationDataRegions).toEqual([
      { region: 'Kyiv', age: 25, type: 'Urban', both_sexes: 1000, males: 500, females: 500 }
    ]);
    expect(store.totalBothSexesRegions).toBe(1000);
    expect(store.totalMalesRegions).toBe(500);
    expect(store.totalFemalesRegions).toBe(500);
  });

  it('clears selections correctly', () => {
    store.setSelectedCities(['Kyiv']);
    store.setSelectedRegions(['Kyiv']);
    store.setSelectedAgeFrom(20);
    store.setSelectedAgeTo(30);
    store.setSelectedSex('males');
    store.setSelectedType('Urban');
    store.setSelectedWaves([1]);

    store.clearSelections();

    expect(store.selectedCities).toEqual([]);
    expect(store.selectedRegions).toEqual([]);
    expect(store.selectedAgeFrom).toBe(null);
    expect(store.selectedAgeTo).toBe(null);
    expect(store.selectedSex).toBe(null);
    expect(store.selectedType).toBe(null);
    expect(store.selectedWaves).toBe(null);
  });
});

