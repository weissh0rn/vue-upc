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
  <div class="container">
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #668cff;
}

.login-form {
  max-width: 400px;
  width: 100%;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1em;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  box-sizing: border-box;
  background-color: #007bff;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-block {
  display: block;
  width: 100%;
}

.error {
  color: red;
  margin-top: 1em;
  text-align: center;
}
</style>

