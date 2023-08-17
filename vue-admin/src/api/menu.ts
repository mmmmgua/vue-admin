import { request } from '@/utils/request'

export function getAllMenuTree() {
  return request.get('/menuTree')
}