
<script setup>
import { ref, computed } from 'vue';

import { useDeckStore } from '../stores/deck';
import { storeToRefs } from 'pinia';

// PINIA
const cardStore = useDeckStore()
const { answeredCards, getSelectedName } = storeToRefs(cardStore)
const { setAnsweredCards, popAnsweredCards } = cardStore;

    const props = defineProps({
        // props definition here...
        "card": Object,
        "cardId": Number,
        "cardWord": String || Number,
        "cardSolution": String || Number,
        "answeredFlag": Boolean,
        "deckName": String,
        
    })

    const toggleButton = ref()

    props.answeredFlag ? toggleButton.value = false : toggleButton.value = true

    const userSolution = ref("")
    const inputPlaceholder = ref("Answer")

    function handleCheck(){
        if(props.cardSolution.toLowerCase() === userSolution.value){
            toggleButton.value = false;
            setAnsweredCards(props.card)
        }
    }

    function handleReset(){
        toggleButton.value = true;
        popAnsweredCards(props.card)
    }

    

</script>

<template>
    <div
    class="border-2 p-2 my-2">
        <p>{{props.cardWord}}</p>
        
        <input v-model="userSolution"
        :placeholder="inputPlaceholder" 
        />

        <div v-if="toggleButton">
            <button @click="handleCheck"> Check </button>    
        </div>
        <div v-else>
            <button @click="handleReset"> Reset </button>
        </div>
    </div>

    

</template>