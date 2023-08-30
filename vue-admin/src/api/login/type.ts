/**
 * @param username 手机号或电子邮箱
 * @param password 密码(RSA Base64密文)
 * @param captchaKey 验证码key
 * @param password 验证码
 */
type loginForm = {
  username: string,
  password: string,
  captchaKey: string,
  captchaCode: string
}

export type { loginForm }