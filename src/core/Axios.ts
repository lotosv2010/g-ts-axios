import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  __requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }
  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    )
  }
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestMethodWithoutData('GET', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestMethodWithoutData('HEAD', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestMethodWithoutData('DELETE', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.__requestMethodWithoutData('OPTIONS', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('POST', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('PATCH', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('PUT', url, data, config)
  }
}
