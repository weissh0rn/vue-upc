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
  <div class="container">
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
  background-color: #3366ff;
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

