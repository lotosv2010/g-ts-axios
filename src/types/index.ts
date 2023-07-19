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
  url?: string
  method?: Method
  headers?: any
  data?: object
  params?: object
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  isAxiosError: boolean
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
