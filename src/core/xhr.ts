import { createError, isURLSameOrigin, parseHeaders } from '../tools'
import cookie from '../tools/cookie'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config

    const request = new XMLHttpRequest()

    const handleResponse = (response: AxiosResponse): void => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        const error = createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        )
        reject(error)
      }
    }

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
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
      const error = createError('Network Error', config, null, request)
      reject(error)
    }

    request.ontimeout = () => {
      const error = createError(
        `Timeout of ${timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      )
      reject(error)
    }

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data as any)
  })
}
