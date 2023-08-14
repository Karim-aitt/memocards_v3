<script setup>
import { ref, watch } from 'vue';
import { useDataStore } from '../stores/data';
import { useDeckStore } from '../stores/deck';
import { storeToRefs } from 'pinia';


    // PINIA
    const dataStore = useDataStore()
    const { setNewCard  } = dataStore;

    const deckStore = useDeckStore()
    const { selectedName } = storeToRefs(deckStore)

    const props = defineProps({
        closeModal: Function
    })


    const newCard = ref({
        deck: "",
        text: "",
        solution: ""
    })

    console.log(selectedName.value)

    watch(selectedName, () => {
        //To set newCard deck key when selectedName changes
        newCard.value.deck = selectedName.value
    })

    function handleSubmit(){
        newCard.value.deck = selectedName.value
        if(newCard.value.deck && newCard.value.text && newCard.value.solution){
            
            setNewCard(newCard.value)
            //reset form
            newCard.value = {
            deck: selectedName.value,
            text: "",
            solution: ""
            }

        } else {
            alert("Selecciona un mazo o no dejes campos vacios")
            console.log(newCard.value)
        }
        props.closeModal()
    }

</script>

<template>

    <div class="contentBox">
        <form @submit.prevent="handleSubmit" class="form">
        <label for="cardText">Card Text:</label>
        <input
            v-model.trim="newCard.text"
            type="text"
            id="cardText"
            placeholder="Enter card text"
            required
            class="input"
        />
    
        <label for="cardSolution">Card Solution:</label>
        <input
            v-model.trim="newCard.solution"
            type="text"
            id="cardSolution"
            placeholder="Enter card solution"
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