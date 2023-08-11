export function validateAccount(username) {
  const reg = /[a-zA-Z0-9]{5,}/
  return reg.test(username)
}

export function validatePwd(password) {
  const reg = /[a-zA-Z0-9]{8,}/
  return reg.test(password)
}
