<script setup>
import { onMounted, ref } from 'vue';
import { useDeckStore } from '../stores/deck';
import { storeToRefs } from 'pinia';
//Components
import SelectComponent from '../components/SelectComponent.vue';
import CardComponent from '../components/CardComponent.vue';

// Pinia
const cardStore = useDeckStore()
const { selectedDeck, answeredCards, selectedName   } = storeToRefs(cardStore)
const { setAllUserDecks, resetCardsInSelectedDeck  } = cardStore;
// ---------------
//console.log(1)



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

    <!-- Deck select -->
    <SelectComponent />

    <!-- Cards render -->
    <div class="flex">
      
      <div class="mx-4" v-if="selectedDeck">

        <CardComponent v-for="(card, index) in selectedDeck"
        :key="card.id"
        :card="card"
        :card-id="card.id"
        :card-word="card.text"
        :card-solution="card.solution"
        :deck-name="selectedName"
        />
        
        </div>
      
      <div class="mx-4" v-if="answeredCards">
        
        <button v-if="answeredCards.length > 0"
          @click="resetCardsInSelectedDeck"
          > Reset all </button>

        <CardComponent v-for="(card, index) in answeredCards"
        :key="card.id"
        :card="card"
        :card-id="card.id"
        :card-word="card.text"
        :card-solution="card.solution"
        :deck-name="selectedName"
        :answeredFlag="true"
        />
        </div>

    </div>
  </main>
</template>
