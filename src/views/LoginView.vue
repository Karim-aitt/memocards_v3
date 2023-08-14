<script setup>
import LoginComponent from '../components/LoginComponent.vue';
import { RouterLink } from 'vue-router'

</script>

<template>
    <div class="contentBox">
      <div class="loginContentBox">
        <LoginComponent class="loginComp" />
        <RouterLink id="toSignup" to="/signup" class="signupLink">Create your account</RouterLink>
      </div>
    </div>
  </template>
  
  <style scoped>
  .contentBox {
    display: flex; /* Agregamos flex para centrar verticalmente */
    justify-content: center; /* Centrar horizontalmente */
    align-items: center; /* Centrar verticalmente */
    height: 80vh; /* Ajustamos la altura del contenedor para centrar verticalmente */
  }
  
  .loginContentBox {
    background-color: var(--sec-color);
    width: 300px;
    text-align: center;
    border-radius: 25px;
    padding: 20px;
  }
  
  .loginComp {
    width: 250px;
    margin: 0 auto;
  }
  
  .signupLink {
    display: block; /* Cambiamos a display block para que ocupe el ancho completo del contenedor */
    margin: 15px 0px;
    color: var(--text-primary);
    text-decoration: underline;
  }
  .signupLink:hover{
    color: var(--main-color);
  }
  </style>