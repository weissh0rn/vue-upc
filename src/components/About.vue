// About.vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.push({ name: 'Login' });
}
</script>

<template>
  <div class="about-container">
    <div class="header">
      <div class="header-title">
        About the Application
      </div>
      <div class="user-info">
        <button class="logout-button" @click="goBack">Back</button>
      </div>
    </div>
    <div class="content">
				<p>
					<h3>
						This Web-application is designed to obtain data on the population of Ukraine in different regions with the ability to choose gender (men, women or together) and age groups of the population.
					</h3>
				</p>
				<p>
					<h3>
						Developer: Viacheslav Us KV-32mp
					</h3>
				</p>
    </div>
  </div>
</template>

