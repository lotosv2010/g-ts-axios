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
  responseType?: XMLHttpRequestResponseType
}
export type Axios = (config: AxiosRequestConfig) => AxiosPromise

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
