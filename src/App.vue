<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
   
    <div>
      <nav>
        <RouterLink class="" to="/">Home</RouterLink>
        <!-- <RouterLink to="/cards">Cards</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
