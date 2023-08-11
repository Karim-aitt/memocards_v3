import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDeckStore } from './deck'
import { useUserStore } from './user'


export const useDataStore = defineStore('data', () => {

  const deckStore = useDeckStore()
  const userStore = useUserStore()
  const userId = ref(userStore.getUserId)


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
    
    try {
        const response = await fetch(url, optionsFetchDeck);

        const data = await response.json();
        

    } catch (error) {
        console.log(error('Error posting Deck', error))
    }
  }

  //SETEAR
  function setNewDeck(newValue){
    newDeck.value = {"name": newValue, "created_by": userId.value }

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

// -------------------------------------------- Add Cards

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
  
  try {
      const response = await fetch(urlCard, optionsFetchCard);

      const data = await response.json();
      

  } catch (error) {
      console.log(error('Error posting Card', error))
  }
}

//SETEAR 
function setNewCard(newValue){
  newCard.value = newValue
  

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
  deckStore.getCardsInDeck();
}


// ------------------------ delete Card

async function deleteCard(id) {

  const urlDelete = `http://localhost:4001/api/cards/${id}`

  try {
      const response = await fetch(urlDelete, {method:"DELETE"});

      const data = await response.json();
      

      deckStore.getCardsInDeck();
  } catch (error) {
      console.log(error('Error deleting Card', error))
  }
}


  return {
      postDeck,
      setNewDeck,
      setNewCard,
      postCard,
      deleteCard
  }
})