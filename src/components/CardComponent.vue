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
const solutionFlag = ref(false)
const solutionClassFlag = ref('')

function toggleSolution(){
  solutionFlag.value = !solutionFlag.value
}

props.answeredFlag ? (toggleButton.value = false) : (toggleButton.value = true)

const userSolution = ref('')
const inputPlaceholder = ref('Answer')

function handleCheck() {
  if (props.cardSolution.toLowerCase() === userSolution.value.toLowerCase()) {
    toggleButton.value = false
    solutionClassFlag.value = 'ok';
    setTimeout(() => {
      setAnsweredCards(props.card)
    }, 2000)
  } else {
    solutionClassFlag.value = 'wrong';
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
  <div class="contentBox" :class="solutionClassFlag">
    <p class="word">{{ capitalize(props.cardWord) }}</p>
    <p v-if="answeredFlag">{{ props.cardSolution }}</p>
    <p v-if="solutionFlag" class="solutionText">{{ props.cardSolution }}</p>

    <input v-if="!answeredFlag" v-model="userSolution" :placeholder="inputPlaceholder" />

    <div class="contentBoxButtons">
      <div v-if="toggleButton">
        <button class="button" @click="handleCheck">Check</button>
        <button class="buttonSolution" @click="toggleSolution">Solution</button>
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
  display: flex;
  flex-direction: column;
  max-width: 350px;
  word-wrap: break-word;
  margin: 20px 20px;
  box-shadow: 3px 3px 2px 2px var(--text-secondary);

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
  border-radius: 5px;
  padding: 8px;
  font-weight: bold;
  background-color: var(--sec-color);
  color: var(--text-primary);
}
.button:hover {
  background-color: var(--main-color);
}

.buttonDelete{
    color: var(--text-terciary);
}
.buttonDelete:hover{
  color: var(--text-danger);
}

.buttonSolution{
  border-radius: 5px;
  padding: 8px;
  font-weight: bold;
  margin-left: 1rem;
  color: var(--text-terciary);
}
.buttonSolution:hover{
  background: var(--other-color);
  color: var(--text-primary);
}

.solutionText{
  color: var(--text-success);
  font-weight: bold;
  font-size: x-large;
}

.ok{
  border: 4px solid var(--text-success);
}
.wrong{
  border: 4px solid rgb(173, 69, 69);
}

</style>
