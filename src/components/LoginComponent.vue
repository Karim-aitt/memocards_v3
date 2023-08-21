<script setup>
import { ref } from 'vue'
import router from '../router'

import { useUserStore } from '../stores/user'
const userStore = useUserStore()
const { setUserId, setUserName } = userStore

const email = ref()
const password = ref()
const wrongEmail = ref(true)
const wrongPassword = ref(true)

async function handleSubmit(e) {
  e.preventDefault()

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
      console.log(response.status)
      if (response.status === 401) {
        wrongEmail.value = false
      }
      if (response.status === 402) {
        wrongEmail.value = true;
        wrongPassword.value = false
      }
      
      throw new Error('Error al loguear, LoginComponent')
    }
    const data = await response.json()
    wrongEmail.value = true
    wrongPassword.value = true

    //remove before values
    localStorage.removeItem('token')
    localStorage.removeItem('id')

    //id set in storage
    localStorage.setItem('token', data.token)
    localStorage.setItem('id', data.user._id)

    //Id set in pinia store
    setUserName(data.user.name)
    setUserId(data.user._id)

    //Redirect a home
    router.push('/')
  } catch (error) {
    console.log('Error Login', error)
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <label for="email">Email:</label>
    <input
      v-model="email"
      type="email"
      id="email"
      placeholder="Enter your email"
      autocomplete="email"
      required
    />
    <p v-if="!wrongEmail" class="textValidation" >Email doesn't match</p>

    <label for="password">Password:</label>
    <input
      v-model="password"
      type="password"
      id="password"
      placeholder="Enter your password"
      autocomplete="current-password"
      required
    />

    <p v-if="!wrongPassword" class="textValidation" >Password doesn't match</p>

    <button type="submit" class="button">Login</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  text-align: left;
}

label {
  color: var(--text-primary);
}

input {
  padding: 8px;
  border-radius: 10px;
}
input:focus {
  outline: none;
  border: 3px solid var(--main-color);
}
button {
  margin-top: 10px;
  border-radius: 10px;
  padding: 8px;
  font-weight: bold;
  background-color: var(--other-color);
  color: var(--text-primary);
}
button:hover {
  background-color: var(--main-color);
}

.textValidation{
  color: var(--text-danger);
  font-weight: bold;
}

</style>
