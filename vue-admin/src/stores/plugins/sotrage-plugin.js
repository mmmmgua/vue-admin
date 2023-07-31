// pinia plugin https://pinia.vuejs.org/zh/core-concepts/plugins.html
import { setStorage, removeStorage } from '../../utils/storage'

// 插件4参：app, options, pinia, store
export function storagePlugin({ options, store }) {
  const persistMap = options.persist
  for (const key in persistMap) {
    persistMap[key].key === 'localStorage'
    return store.$subscribe(({ events }) => {
      if (events.newValue) {
        setStorage(events.key, events.newValue)
      } else {
        removeStorage(events.key)
      }
    })
  }
}
