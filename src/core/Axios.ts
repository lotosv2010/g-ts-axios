import {
  AxiosPromise,
  AxiosRequestConfig,
  Method,
  AxiosResponse,
  PromiseChain,
  Interceptors
} from '../types'
import InterceptorManager from './InterceptorManager'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'

export default class Axios {
  interceptors: Interceptors
  defaults: AxiosRequestConfig

  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = initConfig
  }

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
  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    config = mergeConfig(this.defaults, config)

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift() as PromiseChain
      promise = promise.then(resolved, rejected)
    }
    return promise as AxiosPromise
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
