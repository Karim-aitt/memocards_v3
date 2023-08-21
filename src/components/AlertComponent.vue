<script setup>
import { useDeckStore } from '../stores/deck'
import { storeToRefs } from 'pinia'
// PINIA
const deckStore = useDeckStore()
const { selectedName, allUserDecks } = storeToRefs(deckStore)
const { setDeleteDeck } = deckStore

function handleDelete() {
  const deck = allUserDecks.value.filter((x) => x.name == selectedName.value)
  const deck_id = deck[0]._id
  setDeleteDeck(deck_id)
  props.toggleAlert()
}

const props = defineProps({
  deckName: String,
  toggleAlert: Function
})

</script>

<template>
  <div class="alert p-4" role="alert">
    <span class="text-xl"
      >This will delete the deck <strong class="font-bold uppercase">{{ props.deckName ? props.deckName : "'no deck'" }}</strong>  and all his
      cards <strong class="font-bold">forever.</strong>
    </span>

    <span class="font-bold text-xl">Are you sure?</span>

    <div class="flex justify-center gap-3 my-4">
      <button class="button" @click="handleDelete">Confirm</button>
      <button class="button cancel" @click="props.toggleAlert">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  flex-direction: column;
  background-color: rgb(254 226 226);
  border: rgb(248 113 113);
  color: rgb(185 28 28);
  padding: 0.75rem, 1rem;
  border-radius: 0.25rem;
  text-align: center;
}

.button {
  border-radius: 5px;
  padding: 6px 7px;
  font-weight: bold;
  background-color: rgb(158, 39, 39);
  color: rgb(254 226 226);
}
.cancel {
  background-color: unset;
  color: rgb(158, 39, 39);
}
.button:hover {
  background-color: var(--text-terciary);
  color: rgb(254 226 226);
}
</style>
