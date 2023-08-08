<script setup>
    import { useDataStore } from '../stores/data';

    // PINIA
    const dataStore = useDataStore()
    const { deleteCard  } = dataStore;

    const props = defineProps({
        // props definition here...
        "cardId": Number
        
    })


    function handleDelete(){
        deleteCard(props.cardId)
    }

</script>

<template>

    <button @click="handleDelete"> Delete </button>
</template>