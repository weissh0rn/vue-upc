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
    <router-link to="/about" class="about-link">
      <button type="button" class="btn">R&D^2</button>
    </router-link>
  </div>
</template>


<style scoped>
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(#19c8ff, #00396c);
  position: relative;
  padding: 20px; /* Додаємо padding для уникнення перекриття */
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
  font-size: 1.2rem;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  box-sizing: border-box;
  background-color: var(--primary-color);
}

.btn:hover {
  background-color: var(--primary-hover-color);
}

.btn-block {
  display: block;
  width: 100%;
}

.error {
  color: var(--error-color);
  margin-top: 1em;
  text-align: center;
}

.about-link {
  position: absolute;
  bottom: 10px;
  text-align: center;
  width: 100%;
}

.about-link .btn {
  background: none;
  border: none;
  color: var(--primary-about-color);
  cursor: pointer;
}

.about-link .btn:hover {
  color: var(--primary-about-hover-color);
}

/* Адаптивні стилі */
@media (max-width: 768px) {
  .container-login {
    padding: 10px; /* Збільшуємо padding для малих екранів */
  }

  .login-form {
    padding: 1.5em; /* Зменшуємо padding форми на малих екранах */
  }

  .btn {
    font-size: 1rem; /* Зменшуємо розмір шрифту кнопок на малих екранах */
  }

  .form-control {
    font-size: 1rem; /* Зменшуємо розмір шрифту полів вводу на малих екранах */
  }

  .about-link {
    bottom: 10px; /* Зменшуємо відступ від низу для кнопки "R&D^2" на малих екранах */
  }
}

@media (max-width: 576px) {
  .login-form {
    padding: 1em; /* Далі зменшуємо padding форми на дуже малих екранах */
  }

  .btn {
    font-size: 0.9rem; /* Далі зменшуємо розмір шрифту кнопок на дуже малих екранах */
  }

  .form-control {
    font-size: 0.9rem; /* Далі зменшуємо розмір шрифту полів вводу на дуже малих екранах */
  }

  .about-link {
    bottom: 5px; /* Далі зменшуємо відступ від низу для кнопки "R&D^2" на дуже малих екранах */
  }
}
</style>

