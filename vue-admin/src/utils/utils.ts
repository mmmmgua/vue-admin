export function validateAccount(username: string): boolean {
  const reg = /[a-zA-Z0-9]{5,}/
  return reg.test(username)
}

export function validatePwd(password: string): boolean {
  const reg = /[a-zA-Z0-9]{8,}/
  return reg.test(password)
}

/**
 * @return object node
 */
export function getTreeNodeById(id: string | number, tree: any[]): any {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id === id) {
      return node
    } else {
      if (node.child && node.child.length > 0) {
        const res = getTreeNodeById(id, node.child)
        if (res) {
          return res
        }
      }
    }
  }
}

import JSEncrypt from 'jsencrypt'
export function getRsaStringToBase64(publicKey: string, rawString: string) {
	const encryptor = new JSEncrypt()
	encryptor.setPublicKey(publicKey)
	const rsaPassword = encryptor.encrypt(rawString)
	return rsaPassword
}
