<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import { userVerification } from './api/utils/auth';
import router from './router';

const token = ref()

onMounted(() => {
  token.value = localStorage.getItem("token")
  
  // if(token){
  //   const validation = userVerification(token)

  // }
})

function handleLogout(){
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  router.push('/signup')
}

</script>

<template>
  <header>
   
    <div>
      <nav class="flex gap-3">
        <RouterLink class="" to="/">Home</RouterLink>
        <button @click="handleLogout" v-if="token">Log out</button>
        <!-- <RouterLink to="/cards">Cards</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
