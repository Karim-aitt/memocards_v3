<script setup>
    import { useDeckStore } from '../stores/deck';
    import { storeToRefs } from 'pinia';
    // PINIA
    const deckStore = useDeckStore()
    const { selectedName, allUserDecks  } = storeToRefs(deckStore)
    const { setDeleteDeck  } = deckStore;


    function handleDelete(){
        const deck = allUserDecks.value.filter(x => x.name == selectedName.value)
        const deck_id = deck[0]._id
        setDeleteDeck(deck_id)
    }

</script>

<template>

    <button @click="handleDelete"><i class="fa-solid fa-trash-can"></i> </button>
</template>

<style>

i{
    font-size: x-large;
}

</style>