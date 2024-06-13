// Home.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Home from '@/views/Home.vue';
import { usePopulationStore } from '@/components/calc/population.js';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import MenuSelection from '@/components/calc/MenuSelection.vue';
import PopulationSummary from '@/components/calc/PopulationSummary.vue';
import SearchResultsCities from '@/components/calc/SearchResultsCities.vue';
import SearchResultsRegions from '@/components/calc/SearchResultsRegions.vue';

// Mock the composables
vi.mock('@/components/calc/population.js', () => ({
  usePopulationStore: vi.fn()
}));

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn()
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('Home.vue', () => {
  let wrapper;
  let mockPopulationStore;
  let mockAuthStore;
  let mockRouter;

  beforeEach(() => {
    // Mock stores and router
    mockPopulationStore = {
      loadInitialData: vi.fn(),
      selectedSex: 'both_sexes',
      sexOptions: {
        both_sexes: 'Обидві статі',
        males: 'Чоловіки',
        females: 'Жінки'
      },
      filterPopulationDataCities: vi.fn(),
      filterPopulationDataRegions: vi.fn(),
      filteredPopulationDataCities: [],
      filteredPopulationDataRegions: [],
    };
    mockAuthStore = {
      user: 'TestUser',
      logout: vi.fn()
    };
    mockRouter = {
      push: vi.fn()
    };

    usePopulationStore.mockReturnValue(mockPopulationStore);
    useAuthStore.mockReturnValue(mockAuthStore);
    useRouter.mockReturnValue(mockRouter);

    // Mount component
    wrapper = mount(Home);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls loadInitialData on mount', () => {
    expect(mockPopulationStore.loadInitialData).toHaveBeenCalled();
  });

  it('renders the header with the correct title and user info', () => {
    const headerTitle = wrapper.find('.header-title');
    expect(headerTitle.exists()).toBe(true);
    expect(headerTitle.text()).toBe('Ukraine Population Calculator');

    const userButton = wrapper.find('.user-button');
    expect(userButton.exists()).toBe(true);
    expect(userButton.text()).toBe('TestUser');

    const logoutButton = wrapper.find('.logout-button');
    expect(logoutButton.exists()).toBe(true);
    expect(logoutButton.text()).toBe('Logout');
  });

  it('navigates to user profile on user button click', async () => {
    const userButton = wrapper.find('.user-button');
    await userButton.trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'UserProfile' });
  });

  it('renders child components correctly', () => {
    expect(wrapper.findComponent(MenuSelection).exists()).toBe(true);
    expect(wrapper.findComponent(PopulationSummary).exists()).toBe(true);
    expect(wrapper.findComponent(SearchResultsCities).exists()).toBe(true);
    expect(wrapper.findComponent(SearchResultsRegions).exists()).toBe(true);
  });
});

