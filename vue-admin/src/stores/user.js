import { defineStore } from 'pinia'
import { login } from '../api/login'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      nickname: '',
      avatar: '',
      phone: '',
      user_token: ''
    }
  },
  actions: {
    async login(postData) {
      try {
        const { data } = await login(postData)
        if (data.code === 0) {
          this.user_token = data.data
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  persist: {
    user_token: {
      key: 'localStorage'
    }
  }
})
