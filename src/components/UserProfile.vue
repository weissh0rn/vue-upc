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

