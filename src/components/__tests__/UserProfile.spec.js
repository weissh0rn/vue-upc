// UserProfile.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import UserProfile from '@/components/UserProfile.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn()
}));

describe('UserProfile.vue', () => {
  let wrapper;
  let mockRouter;
  let mockAuthStore;

  beforeEach(() => {
    mockRouter = {
      push: vi.fn()
    };
    mockAuthStore = {
      user: 'TestUser'
    };

    useRouter.mockReturnValue(mockRouter);
    useAuthStore.mockReturnValue(mockAuthStore);

    wrapper = mount(UserProfile, {
      global: {
        mocks: {
          $router: mockRouter,
          $authStore: mockAuthStore
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the header with the correct user profile title', () => {
    const headerTitle = wrapper.find('.header-title');
    expect(headerTitle.exists()).toBe(true);
    expect(headerTitle.text()).toBe('TestUser user profile');
  });

  it('renders user info correctly', () => {
    const userInfoButton = wrapper.find('.user-button');
    expect(userInfoButton.exists()).toBe(true);
    expect(userInfoButton.text()).toBe('TestUser');

    const userInfoText = wrapper.find('.container-home p');
    expect(userInfoText.exists()).toBe(true);
    expect(userInfoText.text()).toBe('User name: TestUser');
  });

  it('calls goBackHome method and navigates to home on Back button click', async () => {
    const backButton = wrapper.find('.logout-button');
    await backButton.trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Home' });
  });
});

