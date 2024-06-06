import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('currentUser') || null,
  }),
  actions: {
    login(username) {
      this.user = username;
      localStorage.setItem('currentUser', username);
    },
    logout() {
      this.user = null;
      localStorage.removeItem('currentUser');
    }
  }
});

