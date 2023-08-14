/**
 * get file name without suffix from path
 * @param url like ../getFileName.suffix
 * @returns
 */
export function getFileName(url:string) {
  let slashIndex = url.lastIndexOf('/')
  slashIndex = slashIndex < 0 ? 0 : slashIndex + 1

  let dotIndex = url.lastIndexOf('.')
  if (dotIndex < 0) {
    dotIndex = url.length - 1
  }
  let result = url.substring(slashIndex, dotIndex)
  return result
}
