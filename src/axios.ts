import Axios from './core/Axios'
import { extend } from './tools'
import { AxiosInstance, Axios as IAxios } from './types'

const createInstance = (): AxiosInstance => {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend<any, IAxios>(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
