import { processHeaders, transformRequest, transformResponse } from './tools'
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'GET',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],
  xsrfCookieName: 'XSRF-TOKEN', // 存储 token 的 cookie 名称
  xsrfHeaderName: 'X-XSRF-TOKEN' // 请求 headers 中 token 对应的 header 名称
}

const methodsNoData = ['get', 'options', 'head', 'delete']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
