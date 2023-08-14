<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <!-- <header>
   
    <div>
      <nav class="flex gap-3">
        <RouterLink class="" to="/">Home</RouterLink>
        <button @click="handleLogout" v-if="token">Log out</button>
        
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style>

body{
  background-color: var(--main-color);
}
</style>
