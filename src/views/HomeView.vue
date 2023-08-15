<script setup>
import { onMounted, ref, watch } from 'vue'
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
const start = ref(0)
const end = ref(start.value+6)

console.log(selectedDeck.value)

const cardsArray = ref()

watch(selectedDeck, () => {
  cardsArray.value = selectedDeck.value?.slice(start.value, end.value)
  console.log(cardsArray.value)
})

function nextCards() {
  const newStart = start.value + 6;
  if (newStart < selectedDeck.value.length) {
    start.value = newStart;
    end.value = start.value + 6;
    cardsArray.value = selectedDeck.value?.slice(start.value, end.value);
  }
}

function beforeCards() {
  const newStart = start.value - 6;
  if (newStart >= 0) {
    start.value = newStart;
    end.value = start.value + 6;
    cardsArray.value = selectedDeck.value?.slice(start.value, end.value);
  }
}

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

      <div class="cardBox" v-if="selectedDeck">
        <CardComponent
          class="cardComponent"
          v-for="card in cardsArray"
          :key="card._id"
          :card-id="card._id"
          :card="card"
          :card-word="card.text"
          :card-solution="card.solution"
          :deck-name="selectedName"
        />
      </div>

      <div v-if="selectedDeck" class="flex justify-around ">
        <button v-if="start > 0" class="buttonArrow" @click="beforeCards">
          <i class="fa-solid fa-arrow-right fa-2xl fa-rotate-180"></i>
        </button>
        <button v-if="end < selectedDeck.length" class="buttonArrow" @click="nextCards">
          <i class="fa-solid fa-arrow-right fa-2xl"></i>
        </button>
      </div>

      <div class="answerBox">
        <div class="buttonResetWrapper">
          <button
            class="buttonResetAll"
            v-if="answeredCards.length > 0"
            @click="resetCardsInSelectedDeck"
          >
            Reset all
          </button>
        </div>

        <div class="answerScrollBox" v-if="answeredCards">
          <CardComponent
            class="cardAnswered"
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
.cardBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 3rem auto;
}

.answerBox {
  display: flex;
  align-items: flex-start; /* Alinea los elementos a la izquierda */
  width: 800px;
  margin: 100px auto;
  
}

.buttonResetWrapper {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center; /* Alinea el botón a la izquierda */
  margin: auto;
}
.buttonResetAll {
  border-radius: 5px;
  padding: 8px;
  font-weight: bold;
  background-color: var(--sec-color);
  color: var(--text-primary);
}
.buttonResetAll:hover{
  background-color: var(--main-color);
}
.answerScrollBox {
  display: flex;
  width: 100%;
  overflow-x: scroll;
  
}
.answerScrollBox:empty {
  overflow-x: hidden;
}

.cardAnswered {
  transform: scale(0.8);
  text-overflow: ellipsis;
  min-width: 300px;
  flex-basis: calc(33.33% - 10px);
  border: 4px solid rgb(34 197 94);
}

.cardComponent {
  flex-basis: calc(33.33% - 10px);
  margin-bottom: 20px;
}

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
.buttonArrow {
  border-radius: 10px;
  width: 5rem;
  height: 3rem;
  color: var(--text-primary);
}
.buttonArrow:hover {
  background-color: var(--other-color);
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .answerBox {
    flex-direction: column; /* Cambia a formato vertical */
    align-items: center; /* Centra los elementos verticalmente */
    width: auto; /* Ancho automático para ajustar al contenido */
    margin: 50px 30px;
    justify-content: center; /* Ajusta el margen vertical */
  }

  .buttonResetWrapper {
    width: 100%; /* Ancho completo */
    margin-bottom: 0 px; /* Añade margen inferior */
  }

  .answerScrollBox {
    display: flex;
    flex-direction: column;
    margin: 30px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .answerScrollBox:empty {
    overflow-x: hidden;
  }
}
</style>
