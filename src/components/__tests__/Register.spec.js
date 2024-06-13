// Register.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useRouter } from 'vue-router';
import Register from '@/views/Register.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('Register.vue', () => {
  let wrapper;
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      push: vi.fn()
    };

    useRouter.mockReturnValue(mockRouter);

    wrapper = mount(Register, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the registration form', () => {
    expect(wrapper.find('input#username').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('input#confirm-password').exists()).toBe(true);
    expect(wrapper.find('button.btn-primary').exists()).toBe(true);
  });

  it('displays an error message when passwords do not match', async () => {
    wrapper.vm.username = 'user';
    wrapper.vm.password = 'password1';
    wrapper.vm.confirmPassword = 'password2';

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toBe('Passwords do not match');
  });

  it('displays an error message when username already exists', async () => {
    localStorage.setItem('existingUser', JSON.stringify({ password: 'password' }));
    
    wrapper.vm.username = 'existingUser';
    wrapper.vm.password = 'password';
    wrapper.vm.confirmPassword = 'password';

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toBe('A user with this username already exists');
  });

  it('calls register method and navigates to login on successful registration', async () => {
    wrapper.vm.username = 'newUser';
    wrapper.vm.password = 'password';
    wrapper.vm.confirmPassword = 'password';

    await wrapper.find('form').trigger('submit.prevent');

    expect(localStorage.getItem('newUser')).toEqual(JSON.stringify({ password: 'password' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
});

