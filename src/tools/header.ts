import { isPlainObject } from './util'

export const CONTENTTYPE = 'Content-Type'

const normalizeHeaderName = (headers: any, normalizeName: string): void => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((name: string) => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      Reflect.deleteProperty(headers, name)
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, CONTENTTYPE)
  if (isPlainObject(data)) {
    if (headers && !headers[CONTENTTYPE]) {
      headers[CONTENTTYPE] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export const parseHeaders = (headers: string): Record<string, string> => {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
