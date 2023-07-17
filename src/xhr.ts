import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  // 设置请求头
  console.log(headers)
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      Reflect.deleteProperty(headers, name)
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data as any)
}
