// UserProfile.vue
<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function goBackHome() {
  router.push({ name: 'Home' });
}
</script>

<template>
  <div>
    <div class="header">
      <div class="header-title">
        {{ authStore.user }} user profile
      </div>
      <div class="user-info">
        <button class="user-button">{{ authStore.user }}</button>
        <button class="logout-button" @click="goBackHome">Back</button>
      </div>
    </div>
    <div class="container-home">
      <p>User name: {{ authStore.user }}</p>
    </div>
  </div>
</template>

<style scoped>


.user-info {
  display: flex;
  align-items: center;
  margin-left: auto;
}


.user-button:hover, .logout-button:hover {
  background-color: var(--primary-hover-color);
}

.container-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 70px; /* Додаємо відступ, щоб контент не заходив під заголовок */
}

.container-home p {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .header-title {
    font-size: 1.2rem;
  }

  .user-button, .logout-button {
    font-size: 0.9rem;
    padding: 5px 10px;
  }

  .container-home p {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .header-title {
    font-size: 1rem;
  }

  .user-button, .logout-button {
    font-size: 0.8rem;
    padding: 5px 8px;
  }

  .container-home p {
    font-size: 0.9rem;
  }
}
</style>

