<script setup>
import RegisterComponent from '../components/RegisterComponent.vue';




</script>

<template>
    <div class="contentBox">
      <div class="registerContentBox">
        <RegisterComponent class="registComp" />
        <RouterLink id="toSignin" to="/signin" class="signinLink">Already have an account?</RouterLink>
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
  
  .registerContentBox {
    background-color: var(--sec-color);
    width: 350px;
    text-align: center;
    border-radius: 25px;
    padding: 20px;
  }
  
  .registerComp {
    width: 250px;
    margin: 0 auto;
  }
  
  .signinLink {
    display: block; /* Cambiamos a display block para que ocupe el ancho completo del contenedor */
    margin-bottom: 0.90rem;
    margin-top: 1.2rem;
    color: var(--text-primary);
    text-decoration: underline;
  }
  .signinLink:hover{
    color: var(--main-color);
  }
</style>