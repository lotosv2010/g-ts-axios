import { deepMerge, isPlainObject } from '../tools'
import { AxiosRequestConfig } from '../types'

const strats = Object.create(null)

const defaultStrat = (val1: any, val2: any): any => {
  return typeof val2 !== 'undefined' ? val2 : val1
}

const fromVal2Strat = (val1: any, val2: any): any => {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const deepMergeStrat = (val1: any, val2: any): any => {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  const mergeField = (key: string): void => {
    const start = strats[key] || defaultStrat
    config[key] = start(config1[key], config2![key])
  }

  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  return config
}
