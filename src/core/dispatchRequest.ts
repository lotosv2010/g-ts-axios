import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL, flattenHeaders } from '../tools'
import transform from './transform'

const transformUrl = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url!, params)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
