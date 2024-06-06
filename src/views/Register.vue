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
    error.value = 'Паролі не співпадають';
    return;
  }
  if (localStorage.getItem(username.value)) {
    error.value = 'Користувач з таким ім\'ям вже існує';
    return;
  }
  localStorage.setItem(username.value, JSON.stringify({ password: password.value }));
  router.push('/login');
}
</script>

<template>
  <div class="card">
    <h4>Register</h4>
    <div>
      <div>
        <label>Username</label>
        <input v-model="username" type="text" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" />
      </div>
      <div>
        <label>Confirm Password</label>
        <input v-model="confirmPassword" type="password" />
      </div>
      <div>
        <button @click="register">Register</button>
      </div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

