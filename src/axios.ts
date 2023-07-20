import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'
import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './defaults'
import { extend } from './tools'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic, Axios as IAxios } from './types'

const createInstance = (config: AxiosRequestConfig): AxiosStatic => {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend<any, IAxios>(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = (config: AxiosRequestConfig): AxiosInstance => {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
