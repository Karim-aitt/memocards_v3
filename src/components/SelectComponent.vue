<script setup>
import { ref, watch } from 'vue';
import { useDeckStore } from '../stores/deck';
import { storeToRefs } from 'pinia';
import DeleteDeckComponent from './DeleteDeckComponent.vue';

// PINIA
const cardStore = useDeckStore()
const { getSelectedName, decksNames, allUserDecks } = storeToRefs(cardStore)
const { setSelectedName } = cardStore;

//--------------------------

const selected = ref('')


//Function to set the user choosed deck
function handleSelectChange(){
  // -------------------- To render on select
    setSelectedName(selected.value)

    // -------------------- To delay the render 500ms
    // setTimeout(setSelectedDeck, 2200)
}

watch(allUserDecks, () => {
  selected.value = ""
})


</script>

<template>
    <div class="border-2 p-2 mt-2">
      

        <select v-model="selected" @change="handleSelectChange">
      
          
          <option disabled value="">Please select one</option>
          <option v-for="option in decksNames" 
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

        <div v-if="selected">
          <DeleteDeckComponent />
        </div>
        
    </div>
</template>

