export interface ResultType<T = any> {
  code: number
  data?: T
  msg: string
}
