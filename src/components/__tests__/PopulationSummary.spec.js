// PopulationSummary.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePopulationStore } from '@/components/calc/population.js';
import PopulationSummary from '@/components/calc/PopulationSummary.vue';

vi.mock('@/components/calc/population.js', () => ({
  usePopulationStore: vi.fn()
}));

describe('PopulationSummary.vue', () => {
  let wrapper;
  let mockPopulationStore;

  beforeEach(() => {
    mockPopulationStore = {
      totalBothSexesCities: 100,
      totalMalesCities: 50,
      totalFemalesCities: 50,
      totalBothSexesRegions: 200,
      totalMalesRegions: 100,
      totalFemalesRegions: 100,
    };

    usePopulationStore.mockReturnValue(mockPopulationStore);

    wrapper = mount(PopulationSummary, {
      props: {
        selectedSex: 'both_sexes'
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('computes selectedData correctly for both sexes', () => {
    expect(wrapper.vm.selectedData.sex).toBe('Разом');
    expect(wrapper.vm.selectedData.cities).toBe(100);
    expect(wrapper.vm.selectedData.regions).toBe(200);
    expect(wrapper.vm.selectedData.total).toBe(300);
  });

  it('computes selectedData correctly for males', async () => {
    await wrapper.setProps({ selectedSex: 'males' });
    expect(wrapper.vm.selectedData.sex).toBe('Чоловіки');
    expect(wrapper.vm.selectedData.cities).toBe(50);
    expect(wrapper.vm.selectedData.regions).toBe(100);
    expect(wrapper.vm.selectedData.total).toBe(150);
  });

  it('computes selectedData correctly for females', async () => {
    await wrapper.setProps({ selectedSex: 'females' });
    expect(wrapper.vm.selectedData.sex).toBe('Жінки');
    expect(wrapper.vm.selectedData.cities).toBe(50);
    expect(wrapper.vm.selectedData.regions).toBe(100);
    expect(wrapper.vm.selectedData.total).toBe(150);
  });

  it('renders the summary table correctly', () => {
    const rows = wrapper.findAll('tr');
    expect(rows.length).toBe(4);

    const cells = rows.map(row => row.findAll('td').map(td => td.text()));
    expect(cells).toEqual([
      ['Стать', 'Разом'],
      ['Міста', '100'],
      ['Регіони', '200'],
      ['Загальне', '300']
    ]);
  });

  it('watches for selectedSex changes', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    await wrapper.setProps({ selectedSex: 'males' });
    expect(consoleLogSpy).toHaveBeenCalledWith('Selected sex changed:', 'males');
    consoleLogSpy.mockRestore();
  });
});

