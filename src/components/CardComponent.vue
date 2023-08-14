<script setup>
import { capitalize, ref } from 'vue'

import { useDeckStore } from '../stores/deck'
import DeleteCardComponent from './DeleteCardComponent.vue'

// PINIA
const cardStore = useDeckStore()
const { setAnsweredCards, popAnsweredCards, deleteAnsweredCard } = cardStore

const props = defineProps({
  // props definition here...
  card: Object,
  cardId: String,
  cardWord: String || Number,
  cardSolution: String || Number,
  answeredFlag: Boolean,
  deckName: String
})

const toggleButton = ref()

props.answeredFlag ? (toggleButton.value = false) : (toggleButton.value = true)

const userSolution = ref('')
const inputPlaceholder = ref('Answer')

function handleCheck() {
  if (props.cardSolution.toLowerCase() === userSolution.value.toLowerCase()) {
    toggleButton.value = false
    setAnsweredCards(props.card)
  }
}

function handleReset() {
  toggleButton.value = true
  popAnsweredCards(props.card)
}
function handleDeleteAnswered() {
  deleteAnsweredCard(props.card)
}
</script>

<template>
  <div class="contentBox">
    <p class="word">{{ capitalize(props.cardWord) }}</p>
    <p v-if="answeredFlag">{{ props.cardSolution }}</p>

    <input v-if="!answeredFlag" v-model="userSolution" :placeholder="inputPlaceholder" />

    <div class="contentBoxButtons">
      <div v-if="toggleButton">
        <button class="button" @click="handleCheck">Check</button>
      </div>
      <div v-else>
        <button class="button" @click="handleReset">Reset</button>
      </div>
      <div>
        <DeleteCardComponent class="buttonDelete" :card-id="props.cardId" :delete="handleDeleteAnswered" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.contentBox {
  padding: 2rem;
  border-radius: 1rem;
  background-color: whitesmoke;

}

.contentBoxButtons{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.word{
    font-size: larger;
}

input {
  padding: 6px;
  border-radius: 10px;
  margin: 1rem;
  border: 3px solid var(--sec-color);
}

input:focus {
  outline: none;
  border: 3px solid var(--main-color);
}

.button {
  border-radius: 10px;
  padding: 8px;
  font-weight: bold;
  background-color: var(--sec-color);
  color: var(--text-primary);
}
.button:hover {
  background-color: var(--main-color);
}

.buttonDelete{
    color: rgb(199, 3, 3);
}


</style>
