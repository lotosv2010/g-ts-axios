import { createError, isFormData, isURLSameOrigin, parseHeaders } from '../tools'
import cookie from '../tools/cookie'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

/**
 * 执行 configureRequest 配置 request 对象
 */
const configureRequest = (
  { responseType, timeout, withCredentials }: AxiosRequestConfig,
  request: XMLHttpRequest
): void => {
  if (responseType) {
    request.responseType = responseType
  }

  if (timeout) {
    request.timeout = timeout
  }

  if (withCredentials) {
    request.withCredentials = withCredentials
  }
}

/**
 * 执行 addEvents 给 request 添加事件处理函数
 */
const addEvents = (
  config: AxiosRequestConfig,
  request: XMLHttpRequest,
  resolve: any,
  reject: any
): void => {
  const { responseType, timeout, onDownloadProgress, onUploadProgress, validateStatus } = config
  const handleResponse = (response: AxiosResponse): void => {
    if (!validateStatus || validateStatus(response.status)) {
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

  // 处理网络异常错误
  request.onerror = () => {
    const error = createError('Network Error', config, null, request)
    reject(error)
  }

  request.ontimeout = () => {
    const error = createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request)
    reject(error)
  }

  if (onDownloadProgress) {
    request.onprogress = onDownloadProgress
  }

  if (onUploadProgress) {
    request.upload.onprogress = onUploadProgress
  }
}

/**
 * 执行 processHeaders 处理请求 headers
 */
const processHeaders = (
  { data, headers, url, withCredentials, xsrfCookieName, xsrfHeaderName, auth }: AxiosRequestConfig,
  request: XMLHttpRequest
): void => {
  if (auth) {
    headers['Authorization'] = `Basic ${btoa(auth.username + ':' + auth.password)}`
  }

  if (isFormData(data)) {
    Reflect.deleteProperty(headers, 'Content-Type')
  }

  if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
    const xsrfValue = cookie.read(xsrfCookieName)
    if (xsrfValue && xsrfHeaderName) {
      headers[xsrfHeaderName] = xsrfValue
    }
  }

  // 设置请求头
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      Reflect.deleteProperty(headers, name)
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
}

/**
 * 执行 processCancel 处理请求取消逻辑
 */
const processCancel = (
  { cancelToken }: AxiosRequestConfig,
  request: XMLHttpRequest,
  reject: any
): void => {
  if (cancelToken) {
    cancelToken.promise.then(reason => {
      request.abort()
      reject(reason)
    })
  }
}
/**
 * 整个流程分为 7 步:
 *  创建一个 request 实例
 *  执行 request.open 方法初始化
 *  执行 configureRequest 配置 request 对象
 *  执行 addEvents 给 request 添加事件处理函数
 *  执行 processHeaders 处理请求 headers
 *  执行 processCancel 处理请求取消逻辑
 *  执行 request.send 方法发送请求
 * @param config
 * @returns
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get' } = config

    // 创建一个 request 实例
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest(config, request)

    addEvents(config, request, resolve, reject)

    processHeaders(config, request)

    processCancel(config, request, reject)

    request.send(data as any)
  })
}
