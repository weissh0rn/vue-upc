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
        About "Ukraine Population Calculator"
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

<style scoped>

.header-title {
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

h3 {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .header-title {
    font-size: 1.2rem;
  }

  .logout-button {
    font-size: 0.9rem;
    padding: 5px 10px;
  }

  .content {
    padding: 1.5em;
    margin-top: 80px; /* Відступ, щоб контент не заходив під заголовок */
  }

  h3 {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .header-title {
    font-size: 1rem;
  }

  .logout-button {
    font-size: 0.8rem;
    padding: 5px 8px;
  }

  .content {
    padding: 1em;
    margin-top: 60px; /* Відступ, щоб контент не заходив під заголовок */
  }

  h3 {
    font-size: 0.9rem;
  }
}

</style>

