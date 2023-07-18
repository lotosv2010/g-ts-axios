import { parseHeaders } from './tools'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'


export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    const handleResponse = (response: AxiosResponse): void => {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }

    if (responseType) {
      request.responseType = responseType
    }

    if(timeout) {
      request.timeout = timeout
    } 

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      if(request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 设置请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        Reflect.deleteProperty(headers, name)
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 处理网络异常错误
    request.onerror = () => {
      reject(new Error('Network Error'))
    }

    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }

    request.send(data as any)
  })
}
