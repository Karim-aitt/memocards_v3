import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDeckStore } from './deck'


export const useDataStore = defineStore('data', () => {

  const deckStore = useDeckStore()

    const newDeck = ref()

    const allDecks = ref()

    const url = "http://localhost:3000/decks";

    const optionsFetch = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allDecks.value),
      };

      async function postDeck() {
        try {
            const response = await fetch(url, optionsFetch);
            const data = await response.json();
            console.log('Deck saved', data)

        } catch (error) {
            console.log(error('Error posting Deck', error))
        }
      }

      function setNewDeck(newValue){
        newDeck.value = {[newValue]: []}
          setAllDecks()
      }

      function setAllDecks(){
        deckStore.setAllUserDecks()
        allDecks.value = {...deckStore.allUserDecks, ...newDeck.value}
        console.log(allDecks.value)
        // postDeck()
      }

      


    return {
        postDeck,
        setNewDeck
    }
})