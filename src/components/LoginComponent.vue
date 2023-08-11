<script setup>
import { ref } from 'vue'
import router from '../router';

import {useUserStore} from '../stores/user'
const userStore = useUserStore()
const { setUserId, setUserName } = userStore

const email = ref()
const password = ref()

async function handleSubmit(e) {
  e.preventDefault();

  const optionsFetch = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value, password: password.value })
  }

  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, optionsFetch)
    if (!response.ok) {
      throw new Error('Error al loguear, LoginComponent')
    }
    const data = await response.json()
    
    //id set in storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.user._id)

    //Id set in pinia store
    setUserName(data.user.name)
    setUserId(data.user._id)

    //Redirect a home
    router.push("/")
    
    
  } catch (error) {
    console.log('Error Login', error)
  }



}


</script>

<template>
    <form class="flex flex-col border-2 gap-2 p-5 w-1/3">
        <input v-model="email" type="email" placeholder="email" autocomplete="on">
        <input v-model="password" type="password" placeholder="password" autocomplete="on">
        <button @click="handleSubmit" >Login</button>
    </form>
</template>