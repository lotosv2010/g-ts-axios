const toString = Object.prototype.toString

export const isDate = (val: any): val is Date => {
  return toString.call(val) === '[object Date]'
}

export const isPlainObject = (val: any): val is object => {
  return toString.call(val) === '[object Object]'
}

export const isObject = (val: any): val is object => {
  return val !== null && typeof val === 'object'
}

export const isArray = (val: any): val is Array<any> => {
  return Array.isArray(val)
}

export const encode = (val: string): string => {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const extend = <T, U>(to: T, from: U): T & U => {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export const deepMerge = (...objs: any[]): any => {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        if (isPlainObject(value)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], value)
          } else {
            result[key] = deepMerge(value)
          }
        } else {
          result[key] = value
        }
      })
    }
  })
  return result
}
