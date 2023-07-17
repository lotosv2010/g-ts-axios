import { isArray, isDate, isObject, encode } from './util'

export const buildURL = (url: string, params?: any) => {
  if (!params) {
    return url
  }
  let tempUrl = url
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    // 参数值为null 或 undefined
    if (val === null && val === undefined) {
      return
    }

    // 参数值为数组
    let values: string[]
    if (isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(v => {
      let tempVal = v
      if (isDate(v)) {
        tempVal = v.toISOString()
      } else if (isObject(v)) {
        tempVal = JSON.stringify(v)
      }
      parts.push(`${encode(key)}=${encode(tempVal)}`)
    })
  })

  //  拼接参数
  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 去除哈希标志
    const markIndex = tempUrl.indexOf('#')
    if (markIndex > -1) {
      tempUrl = tempUrl.substring(0, markIndex)
    }
    tempUrl += tempUrl.indexOf('?') > -1 ? '&' : '?'
    tempUrl += serializedParams
  }
  return tempUrl
}
