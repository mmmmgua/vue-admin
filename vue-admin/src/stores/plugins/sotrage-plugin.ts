// pinia plugin https://pinia.vuejs.org/zh/core-concepts/plugins.html
import { PiniaPluginContext } from 'pinia'
import { setStorage, removeStorage, getStorage } from '@/utils/storage'

// 插件4参：app, options, pinia, store
export function storagePlugin({ options, store }: PiniaPluginContext) {
  let persistMap: string[] = []
  if (typeof options.state === 'function') {
    persistMap = options.state().persist ?? []
  }
  
  if (!persistMap.length) return
  store.$subscribe((mutation: any) => {
    persistMap.forEach((key) => {
      if (key !== mutation.events.key) return
      if (mutation.events.newValue) {
        setStorage(key, mutation.events.newValue)
      } else {
        removeStorage(key)
      }
    })
  })

  store.$patch((state: any) => {
    persistMap.forEach((key) => {
      const storage = getStorage(key)
      state[key] = storage ?? state[key]
    })
  })
}
