import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDeckStore } from './deck'


export const useDataStore = defineStore('data', () => {

  const deckStore = useDeckStore()

    const newDeck = ref()
    const allDecks = ref()

    const url = "http://localhost:4001/api/deck/add";

    let optionsFetch = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newDeck.value,
      };

    async function postDeck() {
      console.log(optionsFetch)
      try {
          const response = await fetch(url, optionsFetch);

          const data = await response.json();
          console.log('Deck saved', data)

      } catch (error) {
          console.log(error('Error posting Deck', error))
      }
    }

    //SETEAR
    function setNewDeck(newValue){
      newDeck.value = {"name": newValue}

      optionsFetch = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDeck.value)
      };

      setAllDecks()
      
    }

    function setAllDecks(){
      postDeck()
      // deckStore.allUserDecks = []
      deckStore.setAllUserDecks()
      deckStore.getDecksNames()
      // allDecks.value = {...deckStore.allUserDecks, ...newDeck.value}
      // console.log(allDecks.value)
    }

    


  return {
      postDeck,
      setNewDeck
  }
})