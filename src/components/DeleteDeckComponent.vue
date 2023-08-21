<script setup>
    import { useDeckStore } from '../stores/deck';
    import { storeToRefs } from 'pinia';
    // PINIA
    const deckStore = useDeckStore()
    const { selectedName, allUserDecks  } = storeToRefs(deckStore)
    const { setDeleteDeck  } = deckStore;

    const props = defineProps({
        toggleAlert: Function
    })

    function handleDelete(){
        const deck = allUserDecks.value.filter(x => x.name == selectedName.value)
        const deck_id = deck[0]._id
        setDeleteDeck(deck_id)
    }

    function handleToggleAlert(){
        if(selectedName.value != ''){
            props.toggleAlert()
        } else{
            alert('Please select a Deck')
        }
    }



</script>

<template>

    <button @click="handleToggleAlert"><i class="fa-solid fa-trash-can deleteButton"></i> </button>
</template>

<style>

i{
    font-size: xx-large;
}

.deleteButton:hover{
    color: rgb(199, 3, 3);
}

</style>