<script setup>
import { ref } from 'vue'
import { useDeckStore } from '../stores/deck';
import { storeToRefs } from 'pinia';

// PINIA
const cardStore = useDeckStore()
const { getSelectedName, getDecksNames } = storeToRefs(cardStore)
const { setSelectedName, setSelectedDeck } = cardStore;
//--------------------------

const selected = ref('')

//This is what is rendered in select
const options = ref(getDecksNames)

//Function to set the user choosed deck
function handleSelectChange(){
    setSelectedName(selected.value)

    // -------------------- To render on select
    // setSelectedDeck()
    // -------------------- To delay the render 500ms
    setTimeout(setSelectedDeck, 200)
    
}

</script>

<template>
    <div class="border-2 p-2 mt-2">

        <select v-model="selected" @change="handleSelectChange">
      
          
          <option disabled value="">Please select one</option>
          <option v-for="option in options" 
              :key="option"
              :value="option"
              >
            {{ option }}
          </option>
      
        </select>
      
        <div>Selected: 
          
          <i v-if="selected">
            {{ getSelectedName }}
          </i>

          <i v-else>
            No deck selected
          </i>
        </div>
    </div>
</template>

