import Axios from './core/Axios'
import defaults from './defaults'
import { extend } from './tools'
import { AxiosInstance, AxiosRequestConfig, Axios as IAxios } from './types'

const createInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend<any, IAxios>(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
