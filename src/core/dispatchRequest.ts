import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import {
  buildURL,
  flattenHeaders,
  processHeaders,
  transformRequest,
  transformResponse
} from '../tools'

const transformUrl = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url!, params)
}

const transformRequestData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data)
}

const transformHeaders = (config: AxiosRequestConfig) => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config) // 必须先处理 headers 在处理 data
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
