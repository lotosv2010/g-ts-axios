import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  /* istanbul ignore next */
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // https://ts.nodejs.cn/docs/handbook/2/classes.html#%E7%BB%A7%E6%89%BF%E5%86%85%E7%BD%AE%E7%B1%BB%E5%9E%8B
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export const createError = (
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError => {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
