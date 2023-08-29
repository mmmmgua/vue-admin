import { getFileName } from '@/utils/url'
const localeModules = import.meta.glob('./**.json', { eager: true }) as any
const viewsModules = import.meta.glob('./views/**.json', { eager: true }) as any
const data: any = {}

Object.keys(localeModules).forEach((key) => {
  data[getFileName(key)] = localeModules[key].default
})
Object.keys(viewsModules).forEach((key) => {
  data[getFileName(key)] = viewsModules[key].default
})
// modules entry
/** when your routing map is too long, you can split it into small modules **/
export default data
