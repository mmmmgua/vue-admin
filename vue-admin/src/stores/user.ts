import { defineStore } from 'pinia'
import { login } from '@/api/login'
import { getRsaStringToBase64 } from '@/utils/utils'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      nickname: '',
      avatar: '',
      phone: '',
      user_token: '',
      persist: ['user_token']
    }
  },
  actions: {
    async login(loginData: object) {
      try {
        const postData = {...loginData}
        postData['password'] = getRsaStringToBase64('key', postData['password'])
        const { data } = await login(postData)
        if (data.code === 0) {
          this.user_token = data.data
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout(){
      try {
        // TODO: 调用退出接口
        this.user_token = ''
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(null)
          }, 500);
        })
      } catch (error) {
        
      }
    }
  }
})
