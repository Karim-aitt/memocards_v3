<script setup>
import { RouterLink } from 'vue-router'
import router from '../router'
import { ref } from 'vue'
import { useDeckStore } from '../stores/deck'
const cardStore = useDeckStore()
const { setDecksNames } = cardStore

const token = ref(localStorage.getItem('token'))

function handleLogout() {
  token.value = ''
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  window.location.href = "http://127.0.0.1:5173/signin"
  
}
</script>

<template>
  <header>
    
      <RouterLink class="" to="/">Home</RouterLink>
        <h1>Memocards</h1>
      <button class="logout" @click="handleLogout" v-if="token">Log out</button>
    
  </header>
</template>

<style scoped>

.logout:hover{
  color: var(--text-danger)
}

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
