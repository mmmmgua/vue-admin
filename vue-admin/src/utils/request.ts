import { useUserStore } from "@/stores/user"
import axios from "axios";

const axiosInstance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.base_url,
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useUserStore().user_token
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
    if (status / 100 === 5) {
      console.warn('server error: ', JSON.stringify(response.data))
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