<script setup>
import { onMounted, ref } from 'vue'
import { useDeckStore } from '../stores/deck'
import { storeToRefs } from 'pinia'
//Components
import SelectComponent from '../components/SelectComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import AddDeckComponent from '../components/AddDeckComponent.vue'
import AddCardComponent from '../components/AddCardComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import DeleteDeckComponent from '../components/DeleteDeckComponent.vue'
// Pinia
const cardStore = useDeckStore()
const { selectedDeck, answeredCards, selectedName, getSelectedName } = storeToRefs(cardStore)
const { setAllUserDecks, resetCardsInSelectedDeck } = cardStore
// ---------------

onMounted(() => {
  // console.log("2")
  //Fetch to get decks from API
  //TODO:Contemplar hacer defineWatcher para cuando se crea un nuevo mazo
  setAllUserDecks()
})

const showDeck = ref(false)
const showCards = ref(false)

function toggleModalDeck() {
  showDeck.value = !showDeck.value
}

function toggleModalCard() {
  showCards.value = !showCards.value
}
</script>

<template>
  <NavbarComponent />

  <div class="deckBar">
    <button @click="toggleModalDeck">
      <i class="fa-solid fa-circle-plus"></i>
    </button>

    <SelectComponent class="select" />

    <DeleteDeckComponent />
  </div>

  <div v-if="showDeck">
    <AddDeckComponent :closeModal="toggleModalDeck" />
  </div>

  <button @click="toggleModalCard" class="addCardButton">
    <i class="fa-solid fa-circle-plus buttonSize"></i>
  </button>

  <div v-if="showCards">
    <AddCardComponent :closeModal="toggleModalCard" />
  </div>

  <div v-if="!showDeck && !showCards" class="modalContainer">
    <main class="mainContainer">
      <br />

      <br />

      <!-- Deck select -->
      <div class="flex gap-3"></div>

      <!-- Cards render -->
      <div class="flex">
        <div class="mx-4" v-if="selectedDeck">
          <CardComponent
            v-for="card in selectedDeck"
            :key="card._id"
            :card-id="card._id"
            :card="card"
            :card-word="card.text"
            :card-solution="card.solution"
            :deck-name="selectedName"
          />
        </div>

        <div class="mx-4" v-if="answeredCards">
          <button v-if="answeredCards.length > 0" @click="resetCardsInSelectedDeck">
            Reset all
          </button>

          <CardComponent
            v-for="card in answeredCards"
            :key="card._id"
            :card="card"
            :card-id="card._id"
            :card-word="card.text"
            :card-solution="card.solution"
            :deck-name="selectedName"
            :answeredFlag="true"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.deckBar {
  width: 100%;
  height: 3rem;
  background-color: var(--other-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: var(--text-primary);
  font-weight: bold;
  font-family: 'Tilt Neon', cursive;
}

.addCardButton {
  position: absolute;
  left: 90%;
  top: 85%;
}

.buttonSize {
  color: var(--text-primary);
  font-size: 4rem;
}
</style>
