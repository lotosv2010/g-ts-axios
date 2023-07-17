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
