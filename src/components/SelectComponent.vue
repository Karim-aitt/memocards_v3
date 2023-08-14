<script setup>
import { ref, watch, capitalize } from 'vue'
import { useDeckStore } from '../stores/deck'
import { storeToRefs } from 'pinia'

// PINIA
const cardStore = useDeckStore()
const { decksNames, allUserDecks } = storeToRefs(cardStore)
const { setSelectedName } = cardStore

//--------------------------

const selected = ref('')

//Function to set the user choosed deck
function handleSelectChange() {
  // -------------------- To render on select
  setSelectedName(selected.value)

  // -------------------- To delay the render 500ms
  // setTimeout(setSelectedDeck, 2200)
}

watch(allUserDecks, () => {
  selected.value = ''
})
</script>

<template>
  <div class="contentBox">
    <select v-model="selected" @change="handleSelectChange">
      <option disabled value="">Please select one</option>
      <option v-for="option in decksNames" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    
  </div>
</template>

<style scoped>
.contentBox {
  display: flex;
}
h1 {
  margin-left: 10px;
  font-size: larger;
}

select{
  color: var(--sec-color);
  padding: 6px;
  border-radius: 10px;
  margin-right: 1rem;
}

</style>
