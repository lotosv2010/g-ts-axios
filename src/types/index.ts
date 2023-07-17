export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'connect'
  | 'CONNECT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'trace'
  | 'TRACE'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  headers?: any
  data?: object
  params?: object
}
export type Axios = (config: AxiosRequestConfig) => void
