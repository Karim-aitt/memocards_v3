import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDeckStore } from './deck'


export const useDataStore = defineStore('data', () => {

  const deckStore = useDeckStore()

  const newDeck = ref()

  const url = "http://localhost:4001/api/deck/add";

  let optionsFetchDeck = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newDeck.value,
    };

  async function postDeck() {
    console.log(optionsFetchDeck)
    try {
        const response = await fetch(url, optionsFetchDeck);

        const data = await response.json();
        console.log('Deck saved', data)

    } catch (error) {
        console.log(error('Error posting Deck', error))
    }
  }

  //SETEAR
  function setNewDeck(newValue){
    newDeck.value = {"name": newValue}

    optionsFetchDeck = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeck.value)
    };

    setAllDecks()
    
  }

  async function setAllDecks() {
    await postDeck();
    deckStore.setAllUserDecks();
  }

// -------------------------------------------- Cards

const newCard = ref()
const urlCard = "http://localhost:4001/api/card/add"

let optionsFetchCard = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: newCard.value,
};

  

async function postCard() {
  console.log(optionsFetchCard)
  try {
      const response = await fetch(urlCard, optionsFetchCard);

      const data = await response.json();
      console.log('Card saved', data)

  } catch (error) {
      console.log(error('Error posting Card', error))
  }
}

//SETEAR 
function setNewCard(newValue){
  newCard.value = newValue
  console.log(newCard.value)

  optionsFetchCard = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard.value)
  };

  setAllCards()
  
}

async function setAllCards() {
  await postCard();
  deckStore.setAllUserDecks();
}


  return {
      postDeck,
      setNewDeck,
      setNewCard,
      postCard,
  }
})