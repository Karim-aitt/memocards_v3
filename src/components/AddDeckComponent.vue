<script setup>
import { ref } from 'vue'
import { useDataStore } from '../stores/data'

const props = defineProps({
    closeModal: Function
})

// PINIA
const dataStore = useDataStore()
const { setNewDeck } = dataStore

const deckName = ref()

function handleSubmit() {
  setNewDeck(deckName.value)
  deckName.value = ''
  props.closeModal()
}
</script>

<template>
    
        <div class="contentBox">
            <form @submit.prevent="handleSubmit" class="form">
              <label for="deckName">Deck Name:</label>
              <input
                v-model.trim="deckName"
                type="text"
                id="deckName"
                placeholder="Enter deck name"
                required
                class="input"
              />
          
              <button type="submit" class="button">Add</button>
            </form>
    
        </div>

    
</template>

<style scoped>



.contentBox{
    margin-top: 2rem;
    display: flex; /* Agregamos flex para centrar verticalmente */
    justify-content: center;
}

form {
    background-color: var(--sec-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 25px;
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
</style>
