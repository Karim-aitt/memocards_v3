<script setup>
import { useDataStore } from '../stores/data';

    // PINIA
    const dataStore = useDataStore()
    const { deleteCard  } = dataStore;

    const props = defineProps({
        // props definition here...
        "cardId": String,
        "delete": Function
        
    })


    function handleDelete(){
        deleteCard(props.cardId)
        props.delete()
    }

</script>

<template>

    <button @click="handleDelete"> <i class="fa-solid fa-trash-can"></i> </button>
</template>