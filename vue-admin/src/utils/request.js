import axios from 'axios'
import { useUserStore } from '@/stores/user'

const axiosInstance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.base_url,
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useUserStore().$state.user_token
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    // for debug
    console.warn('request error :', JSON.stringify(error))
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    const status = response.status
    if (parseInt(status / 100) === 5) {
      // TODO: error message
    }
    return response
  },
  (error) => {
    // for debug
    console.warn('response error: ', JSON.stringify(error))
    return Promise.reject(error)
  }
)

export { axiosInstance as request }
