<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header">
      <div class="header-app-title">
        Ukraine Population Calculator
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>

<style scoped>

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: var(--background-header-color);
  border-bottom: 1px solid #ddd;
  z-index: 1000;
}

.header-app-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .header-app-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .header-app-title {
    font-size: 1rem;
  }
}
</style>
