// Login.vue
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref('');

function login() {
  const storedUser = localStorage.getItem(username.value);
  if (storedUser && JSON.parse(storedUser).password === password.value) {
    authStore.login(username.value);
    router.push('/home');
  } else {
    error.value = 'Invalid username or password';
  }
}
</script>

<template>
  <div class="container-login">
    <div class="login-form">
      <form @submit.prevent="login">
        <div class="form-group">
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group">
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </div>
        <div class="form-group">
          <router-link to="/register">
            <button type="button" class="btn btn-secondary btn-block">Register</button>
          </router-link>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

