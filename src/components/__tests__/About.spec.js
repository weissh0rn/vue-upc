// About.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import About from '@/components/About.vue';
import { useRouter } from 'vue-router';

// Мокетування useRouter
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('About.vue', () => {
  let wrapper;
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      push: vi.fn()
    };
    useRouter.mockReturnValue(mockRouter);
    wrapper = mount(About);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has the correct title', () => {
    const title = wrapper.find('.header-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('About "Ukraine Population Calculator"');
  });

  it('renders the developer information', () => {
    const developerInfo = wrapper.findAll('.content h3').at(1);
    expect(developerInfo.exists()).toBe(true);
    expect(developerInfo.text()).toBe('Developer: Viacheslav Us KV-32mp');
  });

  it('calls router.push with correct route when back button is clicked', async () => {
    const backButton = wrapper.find('.logout-button');
    await backButton.trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Login' });
  });
});

