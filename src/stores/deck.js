import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useDeckStore = defineStore('deck', () => {
    
  //All user decks
  const allUserDecks = ref()
  //Deck selected by User
  const selectedDeck = ref()

  //All key names
  const decksNames = ref([])
  //Key Name to identify the deck selected
  const selectedName = ref('')

  //Array with correct cards answered by the user
  const answeredCards = ref([])

  //GETTERS
  const getAllUserDecks = computed(() => allUserDecks.value)
  const getSelectedDeck = computed(() => selectedDeck.value)

  const getDecksNames = computed(() => decksNames.value)
  const getSelectedName = computed(() => selectedName.value)

  //SETTERS
  
  //Decks Names
  function setDecksNames(names) {
    decksNames.value = names
  }

  //Selected Name Deck
  function setSelectedName(nameKey){
    selectedName.value = nameKey
    //To reset cards on deck change
    resetCardsInSelectedDeck()
  }

  //Selected User Deck
  function setSelectedDeck(){
    //peticion get para conseguir las cartas del susodicho 
    getCardsInDeck()

    if(answeredCards.value.length == 0){
      // selectedDeck.value = allUserDecks.value[selectedName.value]
      // selectedDeck.value = allCardsInDeck.value
      // console.log(selectedDeck.value)
    }
    else{
      selectedDeck.value = allUserDecks.value[selectedName.value].filter(card => 
        !answeredCards.value.includes(card)
        )
    }
  }

  function setAnsweredCards(card){
    answeredCards.value.push(card)
    selectedDeck.value = selectedDeck.value.filter(x => x !== card )
  }

  function popAnsweredCards(card){
    selectedDeck.value = [card, ...selectedDeck.value]
    answeredCards.value = answeredCards.value.filter(x => x !== card )
  }

  function resetCardsInSelectedDeck(){
    getCardsInDeck()
    answeredCards.value = []
  }

  //Delete Deck Selected

  function setDeleteDeck(){
    console.log(allUserDecks.value)
    delete allUserDecks.value[selectedName.value]
    console.log(allUserDecks.value)
  }


  //FETCH Decks data
  async function setAllUserDecks() {
    try {
      const response = await fetch('http://localhost:4001/api/decks') // Replace 'http://localhost:3000' with your actual endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      
      console.log(data, "data")
      
      if(decksNames.value.length > 0){
        decksNames.value = []
      }

      //Saves the names from user decks
      data.forEach(deck => {decksNames.value.push(deck.name)})

      // console.log(decksNames.value)
      //Saves entire user decks with their values
      allUserDecks.value = data

    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  }

  async function getCardsInDeck(){
    try {
      const response = await fetch(`http://localhost:4001/api/${selectedName.value}/cards`, {
      
    })

      if(!response.ok){
        throw new Error('Network error fecthing cards')
      }
      const data = await response.json()

      console.log(data)
      selectedDeck.value = data;
      
    }
    catch (error){
      console.log("Error fecthing cards", error)
    }
  }

  


  return {
    decksNames,
    getDecksNames,
    setDecksNames,

    allUserDecks,
    getAllUserDecks,
    setAllUserDecks,

    selectedDeck,
    getSelectedDeck,
    setSelectedDeck,

    selectedName,
    getSelectedName,
    setSelectedName,

    answeredCards,
    setAnsweredCards,
    popAnsweredCards,

    resetCardsInSelectedDeck,
    setDeleteDeck
  }

  })