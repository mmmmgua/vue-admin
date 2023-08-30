/**
 * @returns code
 * @returns code
 */
type response = {
  code: number,
  data: any,
  msg: string
}

type pagination = {
  pageSize?: number,
  currentPage?: number
}

export type { response, pagination }