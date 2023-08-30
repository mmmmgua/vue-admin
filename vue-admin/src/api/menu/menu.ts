import { AxiosResponse } from 'axios'
import { request } from '@/utils/request'
import { response } from '../baseType'

export function getUserMenuTree(): Promise<AxiosResponse<response>> {
  return request.get('/userTree')
}

export function getAllMenuTree(): Promise<AxiosResponse<response>> {
  return request.get('/menuTree')
}