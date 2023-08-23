import { request } from '@/utils/request'

export function getRoles(params?: object) {
  return request.get('/roles', { params })
}