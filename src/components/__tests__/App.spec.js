// App.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { RouterView } from 'vue-router';
import App from '@/App.vue';

describe('App.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the header with the correct title', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true
        }
      }
    });
    const headerTitle = wrapper.find('.header-app-title');
    expect(headerTitle.exists()).toBe(true);
    expect(headerTitle.text()).toBe('Ukraine Population Calculator');
  });

  it('renders the RouterView', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true
        }
      }
    });
    const routerView = wrapper.findComponent(RouterView);
    expect(routerView.exists()).toBe(true);
  });
});

