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
    error.value = 'Неправильне ім\'я користувача або пароль';
  }
}
</script>

<template>
  <div class="card">
    <h4>Login</h4>
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
        <button @click="login">Login</button>
      </div>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <router-link to="/register">Register</router-link>
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

