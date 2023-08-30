import { AxiosResponse } from 'axios'
import { request } from '@/utils/request'
import { response } from '../baseType'
import { loginForm } from './type'

export function login(data: loginForm): Promise<AxiosResponse<response>> {
  return request.post('/login', data)
}

export function getCaptcha(): Promise<AxiosResponse<response>> {
  return request.get('/captcha')
}