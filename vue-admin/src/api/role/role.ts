import { AxiosResponse } from 'axios'
import { request } from '@/utils/request'
import { pagination, response } from '../baseType'

export function getRoles(params?: pagination): Promise<AxiosResponse<response>> {
  return request.get('/roles', { params })
}