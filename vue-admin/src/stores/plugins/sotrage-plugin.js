// pinia plugin https://pinia.vuejs.org/zh/core-concepts/plugins.html
import { setStorage, removeStorage, getStorage } from '../../utils/storage'

// 插件4参：app, options, pinia, store
export function storagePlugin({ options, store }) {
  const persistMap = options.persist
  if (!persistMap) return
  store.$subscribe((mutation) => {
    Object.keys(persistMap).forEach((key) => {
      if (key !== mutation.events.key) return
      if (mutation.events.newValue) {
        setStorage(key, mutation.events.newValue)
      } else {
        removeStorage(key)
      }
    })
  })

  store.$patch((state) => {
    Object.keys(persistMap).forEach((key) => {
      const storage = getStorage(key)
      state[key] = storage ?? state[key]
    })
  })
}
