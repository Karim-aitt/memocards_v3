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

    // const { } = deckStore;


    const newCard = ref({
        deck: "",
        text: "",
        solution: ""
    })

    watch(selectedName, () => {
        newCard.value.deck = selectedName.value
    })

    function handleSubmit(){

        if(newCard.value.deck && newCard.value.text && newCard.value.solution){
            
            setNewCard(newCard.value)
            //reset form
            newCard.value = {
            text: "",
            solution: ""
            }

        } else {
            alert("Selecciona un mazo o no dejes campos vacios")
        }
        
    }

</script>

<template>

    
    <div  class="flex flex-col border-2 gap-2 px-2">
        <input v-model.trim="newCard.text" placeholder="Card text">
        <input v-model.trim="newCard.solution" placeholder="Card Solution">
        <button @click="handleSubmit"> Add </button>
    </div>
    
        

</template>