<script setup>
import { onMounted, ref } from 'vue';
import { useDeckStore } from '../stores/deck';
import { storeToRefs } from 'pinia';

const cardStore = useDeckStore()
const { getSelectedName} = storeToRefs(cardStore)
const { setSelectedName } = cardStore;



function handleName(){
    setDeckName('pepe')
}

onMounted(() => {
    
  });

</script>

<template>
    <h1>Cards View</h1>
    <button @click="handleName"> Button </button>
    <h2>{{ getSelectedName }}</h2>
</template>