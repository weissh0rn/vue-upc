// SeartchResultsCities.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePopulationStore } from '@/components/calc/population.js';
import SeartchResultsCities from '@/components/calc/SearchResultsCities.vue';

vi.mock('@/components/calc/population.js', () => ({
  usePopulationStore: vi.fn()
}));

describe('SeartchResultsCities.vue', () => {
  let wrapper;
  let mockPopulationStore;

  beforeEach(() => {
    mockPopulationStore = {
      filterPopulationDataCities: vi.fn(),
      filteredPopulationDataCities: [
        { id: 1, age: 25, city: 'Kyiv', type: 'Urban', females: 5000, males: 4500, both_sexes: 9500 },
        { id: 2, age: 30, city: 'Lviv', type: 'Urban', females: 3000, males: 2800, both_sexes: 5800 },
      ],
    };

    usePopulationStore.mockReturnValue(mockPopulationStore);

    wrapper = mount(SeartchResultsCities);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls filterPopulationDataCities method on mount', () => {
    expect(mockPopulationStore.filterPopulationDataCities).toHaveBeenCalled();
  });

  it('renders the search results table with correct headers', () => {
    const headers = wrapper.findAll('th').map(header => header.text());
    expect(headers).toEqual(['Вік', 'Місто', 'Тип населення', 'Жінки', 'Чоловіки', 'Разом']);
  });

  it('renders the search results table with correct data', () => {
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);

    const cells = rows.map(row => row.findAll('td').map(td => td.text()));
    expect(cells).toEqual([
      ['25', 'Kyiv', 'Urban', '5000', '4500', '9500'],
      ['30', 'Lviv', 'Urban', '3000', '2800', '5800'],
    ]);
  });
});

