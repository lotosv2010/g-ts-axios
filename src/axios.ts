import { AxiosRequestConfig, Axios } from './types'
import xhr from './xhr'
import { buildURL, transformRequest } from './tools'

const transformUrl = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

const transformRequestData = (config: AxiosRequestConfig): any => {
  return transformRequest(config.data)
}

const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

const axios: Axios = (config: AxiosRequestConfig): void => {
  processConfig(config)
  console.log(config)
  xhr(config)
}

export default axios
