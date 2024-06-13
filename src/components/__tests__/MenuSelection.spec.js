//MenuSelection.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import MenuSelection from '@/components/calc/MenuSelection.vue';
import { usePopulationStore } from '@/components/calc/population.js';
import vSelect from 'vue-select';

vi.mock('@/components/calc/population.js', () => ({
  usePopulationStore: vi.fn()
}));

describe('MenuSelection.vue', () => {
  let wrapper;

  const mockPopulationStore = {
    uniqueCities: ['City1', 'City2'],
    uniqueRegions: ['Region1', 'Region2'],
    uniqueAges: [20, 30, 40],
    uniqueTypes: ['Type1', 'Type2'],
    sexOptions: { M: 'Male', F: 'Female' },
    uniqueWaves: ['Wave1', 'Wave2'],
    selectedCities: [],
    selectedRegions: [],
    selectedAgeFrom: null,
    selectedAgeTo: null,
    selectedType: null,
    selectedSex: null,
    selectedWaves: null,
    clearSelections: vi.fn()
  };

  beforeEach(() => {
    usePopulationStore.mockReturnValue(mockPopulationStore);
    wrapper = mount(MenuSelection, {
      global: {
        components: {
          'v-select': vSelect
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders city select with correct options', () => {
    const citySelect = wrapper.findAllComponents(vSelect).at(0);
    expect(citySelect.exists()).toBe(true);
    expect(citySelect.props('options')).toEqual(mockPopulationStore.uniqueCities);
  });

  it('renders region select with correct options', () => {
    const regionSelect = wrapper.findAllComponents(vSelect).at(1);
    expect(regionSelect.exists()).toBe(true);
    expect(regionSelect.props('options')).toEqual(mockPopulationStore.uniqueRegions);
  });

  it('renders age select with correct options', () => {
    const ageFromSelect = wrapper.findAllComponents(vSelect).at(2);
    const ageToSelect = wrapper.findAllComponents(vSelect).at(3);
    expect(ageFromSelect.exists()).toBe(true);
    expect(ageFromSelect.props('options')).toEqual(mockPopulationStore.uniqueAges);
    expect(ageToSelect.exists()).toBe(true);
    expect(ageToSelect.props('options')).toEqual(mockPopulationStore.uniqueAges);
  });

  it('renders type select with correct options', () => {
    const typeSelect = wrapper.findAllComponents(vSelect).at(4);
    expect(typeSelect.exists()).toBe(true);
    expect(typeSelect.props('options')).toEqual(mockPopulationStore.uniqueTypes);
  });

  it('renders sex select with correct options', () => {
    const sexSelect = wrapper.findAllComponents(vSelect).at(5);
    expect(sexSelect.exists()).toBe(true);
    expect(sexSelect.props('options')).toEqual([
      { value: 'M', label: 'Male' },
      { value: 'F', label: 'Female' }
    ]);
  });

  it('renders wave select with correct options', () => {
    const waveSelect = wrapper.findAllComponents(vSelect).at(6);
    expect(waveSelect.exists()).toBe(true);
    expect(waveSelect.props('options')).toEqual(mockPopulationStore.uniqueWaves);
  });

  it('calls clearSelections method on clear button click', async () => {
    const clearButton = wrapper.find('.clear-button');
    await clearButton.trigger('click');
    expect(mockPopulationStore.clearSelections).toHaveBeenCalled();
  });
});

