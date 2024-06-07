// Register.vue
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');

function register() {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }
  if (localStorage.getItem(username.value)) {
    error.value = 'A user with this username already exists';
    return;
  }
  localStorage.setItem(username.value, JSON.stringify({ password: password.value }));
  router.push('/login');
}
</script>

<template>
  <div class="container-login">
    <div class="login-form">
      <form @submit.prevent="register">
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
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            class="form-control"
            placeholder="Confirm your password"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Register</button>
        </div>
        <div class="form-group">
          <router-link to="/login">
            <button type="button" class="btn btn-secondary btn-block">Login</button>
          </router-link>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

