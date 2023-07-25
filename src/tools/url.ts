import { isArray, isDate, isPlainObject, encode, isURLSearchParams } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

const urlParsingNode = document.createElement('a')

const resolveURL = (url: string): URLOrigin => {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}

const currentOrigin = resolveURL(window.location.href)

export const isURLSameOrigin = (requestURL: string): boolean => {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

export const isAbsoluteURL = (url: string): boolean => {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export const combineURL = (baseURL: string, relativeURL?: string): string => {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export const buildURL = (url: string, params?: any, paramsSerializer?: (params: any) => string) => {
  if (!params) {
    return url
  }

  let tempUrl = url
  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
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
        } else if (isPlainObject(v)) {
          tempVal = JSON.stringify(v)
        }
        parts.push(`${encode(key)}=${encode(tempVal)}`)
      })
    })

    //  拼接参数
    serializedParams = parts.join('&')
  }

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
