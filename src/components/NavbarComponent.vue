<script setup>
import { RouterLink } from 'vue-router'
import router from '../router'
import { ref } from 'vue'

const token = ref(localStorage.getItem('token'))

function handleLogout() {
  token.value = ''
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  router.push('/signup')
}
</script>

<template>
  <header>
    
      <RouterLink class="" to="/">Home</RouterLink>
        <h1>Memocards</h1>
      <button @click="handleLogout" v-if="token">Log out</button>
    
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: var(--sec-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  color: var(--text-primary);
  font-weight: bold;
  font-family: 'Tilt Neon', cursive;
}

h1{
  font-size: x-large;
  font-family: 'Courgette', 'Tilt Neon', cursive;
  font-weight: 400;
}

</style>
