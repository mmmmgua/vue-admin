import { request } from '../utils/request'

export function getUserMenuTree() {
  return request.get('/userTree')
}
