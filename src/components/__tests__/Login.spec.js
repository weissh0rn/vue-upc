// Login.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Login from '@/views/Login.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn()
}));

describe('Login.vue', () => {
  let wrapper;
  let mockRouter;
  let mockAuthStore;

  beforeEach(() => {
    mockRouter = {
      push: vi.fn()
    };
    mockAuthStore = {
      login: vi.fn()
    };

    useRouter.mockReturnValue(mockRouter);
    useAuthStore.mockReturnValue(mockAuthStore);

    wrapper = mount(Login, {
      global: {
        mocks: {
          $auth: mockAuthStore
        }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the login form', () => {
    expect(wrapper.find('input#username').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button.btn-primary').exists()).toBe(true);
  });

  it('calls login method and navigates to home on successful login', async () => {
    // Мокаємо локальне сховище для успішного логіну
    const storedUser = JSON.stringify({ password: 'password' });
    localStorage.setItem('user', storedUser);

    // Встановлюємо значення для username і password напряму
    wrapper.vm.username = 'user';
    wrapper.vm.password = 'password';

    // Викликаємо метод login
    await wrapper.find('form').trigger('submit.prevent');

    // Перевіряємо, чи метод login був викликаний
    expect(mockAuthStore.login).toHaveBeenCalledWith('user');

    // Перевіряємо, чи відбулося перенаправлення на головну сторінку
    expect(mockRouter.push).toHaveBeenCalledWith('/home');
  });

  it('displays an error message on failed login', async () => {
    // Встановлюємо значення для username і password напряму
    wrapper.vm.username = 'user';
    wrapper.vm.password = 'wrongpassword';

    // Викликаємо метод login
    await wrapper.find('form').trigger('submit.prevent');

    // Перевіряємо, чи з'явилося повідомлення про помилку
    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toBe('Invalid username or password');
  });
});

