import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {

    const newDeck = ref({
        deckName: ""
    })

    const url = "http://localhost:3000/decks";

    const optionsFetch = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDeck),
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

    return {
        postDeck,
    }
})