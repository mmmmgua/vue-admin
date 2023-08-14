import { request } from '../utils/request'

export function login(data:object) {
  return request.post('/login', data)
}
