<script setup>
import { ref } from 'vue';
import { useDataStore } from '../stores/data';


    // PINIA
    const dataStore = useDataStore()
    const { setNewDeck, postDeck,  } = dataStore;


    const deckName = ref()

    function handleSubmit(){
        setNewDeck(deckName.value)
    }

</script>

<template>

    
    <div  class="border-2 p-2">
        <input v-model.trim="deckName" placeholder="Deck Name">
        <button @click="handleSubmit"> Add </button>
    </div>
    
        

</template>