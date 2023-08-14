import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

    const userToken = ref(localStorage.getItem('token'))
    const userName = ref()

    //Used to fetch user decks
    const userId = ref(localStorage.getItem('id'))

    //getters
    const getUserId = computed(() => userId.value)
    const getUserToken = computed(() => userToken.value)

    //setters
    function setUserId(id){
        userId.value = id
        
    }
    function setUserName(name){
        userName.value = name
    }

    return {
        userToken,
        userId,
        getUserId,

        setUserName,
        setUserId,
        getUserToken
    }
})