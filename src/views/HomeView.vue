<script setup>
import { ref, onMounted } from 'vue';
import { useDeckStore } from '../stores/deck';
import { storeToRefs } from 'pinia';
//Components
import SelectComponent from '../components/SelectComponent.vue';
import CardComponent from '../components/CardComponent.vue';
import AddDeckComponent from '../components/AddDeckComponent.vue';
import AddCardComponent from '../components/AddCardComponent.vue';

// Pinia
const cardStore = useDeckStore()
const { selectedDeck, answeredCards, selectedName   } = storeToRefs(cardStore)
const { setAllUserDecks, resetCardsInSelectedDeck  } = cardStore;
// ---------------


onMounted(() =>{
  // console.log("2")
  //Fetch to get decks from API
  //TODO:Contemplar hacer defineWatcher para cuando se crea un nuevo mazo
  setAllUserDecks();
})
</script>

<template>
  <main>
    <h1 class="text-red-500">Home view</h1>
    <br>
     <AddDeckComponent />
    <br>

    <!-- Deck select -->
    <div class="flex gap-3">
      <SelectComponent />
      <AddCardComponent />
      </div>

    <!-- Cards render -->
    <div class="flex">
      
      <div class="mx-4" v-if="selectedDeck">

        <CardComponent v-for="(card) in selectedDeck"
        :key="card._id"
        :card-id="card._id"
        :card="card"
        :card-word="card.text"
        :card-solution="card.solution"
        :deck-name="selectedName"
        />
        
        </div>
      
      <div class="mx-4" v-if="answeredCards">
        
        <button v-if="answeredCards.length > 0"
          @click="resetCardsInSelectedDeck"
          > Reset all </button>

        <CardComponent v-for="(card) in answeredCards"
        :key="card._id"
        :card="card"
        :card-word="card.text"
        :card-solution="card.solution"
        :deck-name="selectedName"
        :answeredFlag="true"
        />
        </div>

    </div>
  </main>
</template>
