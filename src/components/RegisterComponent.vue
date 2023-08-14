<script setup>
import { ref } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const { setUserId, setUserName } = userStore;

const userName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

async function handleSubmit(e) {
  e.preventDefault();

  // Perform form validations
  if (!userName.value || !email.value || !password.value || !confirmPassword.value) {
    console.log('Please fill out all fields');
    return;
  }

  if (password.value !== confirmPassword.value) {
    console.log('Passwords do not match');
    return;
  }

  // You can add more validation checks here, such as checking email format, password strength, etc.

  // If all validations pass, proceed with API call

  const optionsFetch = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userName.value,
      email: email.value,
      password: password.value,
    }),
  };

  console.log(optionsFetch);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, optionsFetch);

    if (!response.ok) {
      throw new Error('Error al crear usuario, registerComponent');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);

    // Id set in pinia store
    setUserName(data.name);
    setUserId(data.id);

    // Redirect to home
    router.push('/');
  } catch (error) {
    console.log('Error sign up', error);
  }
}
</script>

<template>

<!-- <p v-if="errors.length">
    <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p> -->


  <form @submit="handleSubmit">
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      v-model="userName"
      placeholder="Enter your username"
      autocomplete="username"
      required
    />

    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      v-model="email"
      placeholder="Enter your email"
      autocomplete="email"
      required
    />

    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      v-model="password"
      placeholder="Enter your password"
      autocomplete="new-password"
      required
    />

    <label for="confirmPassword">Confirm Password</label>
    <input
      type="password"
      id="confirmPassword"
      v-model="confirmPassword"
      placeholder="Confirm your password"
      autocomplete="new-password"
      required
    />

    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>

form{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  text-align: left;
}

label{
  color: var(--text-primary)
}

input{
  padding: 8px;
  border-radius: 10px;
}
input:focus{
  outline: none;
  border: 3px solid var(--main-color);
}
button{
  margin-top: 10px;
  border-radius: 10px;
  padding: 8px;
  font-weight: bold;
  background-color: var(--other-color);
  color: var(--text-primary);
}
button:hover{
  background-color: var(--main-color);
}

</style>
