import dayjs from 'dayjs'
import { isArray, isNumber, isObject } from './tools'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

interface Result<T> {
  code?: number
  message?: string
  data?: T
}

interface Console<T = string> {
  log: (str: T) => void
  warn: (str: T) => void
  error: (str: T) => void
  success: (str: T) => void
}

const _console: Console<string> = {
  log(str) {
    console.log(`%c${str}`, 'background:#303133;color:#fff;fontSize:14px')
  },
  warn(str) {
    console.log(`%c${str}`, 'background:#E6A23C;color:#fff;fontSize:14px')
  },
  error(str) {
    console.log(`%c${str}`, 'background:#FC0505;color:#fff;fontSize:14px')
  },
  success(str) {
    console.log(`%c${str}`, 'background:#67C23A;color:#fff;fontSize:14px')
  },
}

/**
 * 以cdn形式引入插件，例如可以cdn引入echarts，这样可以显著减少打包的体积
 */
const loadScript = (scriptURL: string, host: string) => {
  new Promise((resolve, reject) => {
    const head = document.head
    const dom = head.querySelector(`[src*="${host}"]`)
    if (dom) {
      resolve('已经加载成功')
    } else {
      const newDom: HTMLScriptElement = document.createElement('script')
      newDom.type = 'text/javascript'
      newDom.src = scriptURL
      newDom.onerror = reject
      newDom.onload = resolve
      head.appendChild(newDom)
    }
  })
}

/**
 * 立即执行的setInterval
 * @param func1
 * @param delayTime 延迟执行时间
 */
const immediateSetInterval = (func1: () => void, delayTime: number) => {
  const timer = setInterval(
    (function callback(func2: () => void) {
      func2()
      return callback
    })(func1),
    delayTime
  )
  return timer
}

/**
 * 返回值的类型
 * @param value 任意值（经过toLowerCase处理）
 */
const getTypeOfValue = (value: unknown) =>
  Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()

const getPropValue = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key]
}

/**
 * 深度合并
 * @param target
 * @param src
 */
const deepMerge = <T extends object>(target: T, src: any = {}): T => {
  for (let key in src) {
    target[key] =
      getTypeOfValue(target[key]) === 'object'
        ? deepMerge(target[key], src[key])
        : (target[key] = src[key])
  }
  return target
}

/**
 * Merge the contents of two or more objects together into the first object.
 * 暂时没有用上
 */
export const merge = <T extends object>(target: T, ...src: any[]) => {
  let acc: unknown
  let copy: unknown
  let clone: object
  for (let i = 0; i < src.length; i++) {
    for (let key in src[i]) {
      acc = target[key]
      copy = src[i][key]
      if (target === copy) continue
      if (copy && isObject(copy)) {
        clone = acc && isArray(acc) ? acc : {}
        target[key] = merge(clone, copy)
      } else if (copy !== undefined) {
        target[key] = copy
      }
    }
  }
  return target
}

/*************下面的代码是封装promise请求*************/
const awaitWrap = (promise: Promise<Result<any>>) =>
  promise
    .then(res => ({ success: res, error: null }))
    .catch(err => ({ success: null, error: err }))

/**
 * 返回经过封装的promise或者函数，可以被注入到vue.prototype上
 * @param {function} func:(...args:any[])=>any
 * @returns {function}
 */
const willInject = (func: (...args: any[]) => any, successCodes?: number[]) => {
  if (['promise', 'function'].indexOf(getTypeOfValue(func)) > -1) {
    return async (...funcParams: any[]) => {
      const promiseTmp = func(...funcParams)
      if (getTypeOfValue(promiseTmp) === 'promise') {
        if (!successCodes || successCodes.length === 0) {
          successCodes = [200, 0]
        } else {
          successCodes = [...successCodes]
        }
        const { success, error } = await awaitWrap(promiseTmp)
        if (!success) {
          _console.error(
            `Oh..., There is an error with the network request ${error}`
          )
          return { data: null }
        } else {
          const { code = 200, message = '' } = success
          if (successCodes.indexOf(code) > -1) {
            return success
          } else {
            _console.error(
              `The network request returns a data error-->${code}-->${message}`
            )
          }
        }
      } else {
        return func
      }
    }
  } else {
    _console.warn(
      `An unsupported format is detected and will be skipped, expected 'promise,function'`
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (...funcParams: any[]) => {
      return func
    }
  }
}
/****************************************************/

/**
 * 格式化时间
 * @param date
 * @param format
 */
const formatTime = (
  date: string | undefined = undefined,
  format: string = DATE_TIME_FORMAT
): string => {
  return dayjs(date).format(format)
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * @example
 * ```ts
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 * ```
 */
const setObjToUrlParams = (baseUrl: string, obj: any): string => {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * Generates a random hexadecimal color code
 * 生成随机的十六进制颜色代码
 * @returns {string}
 */
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}

/**
 * Converts a color code to an rgb() or rgba() string if alpha value is provided
 * @param hex
 * @returns
 */
const hexToRGB = (hex: string) => {
  let alpha: boolean = false
  let h: string = hex.slice(hex.startsWith('#') ? 1 : 0)
  if (h.length === 3) h = [...h].map(x => x + x).join('')
  else if (h.length === 8) alpha = true
  const n = parseInt(h, 16)
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (n >>> (alpha ? 24 : 16)) +
    ', ' +
    ((n & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((n & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${n & 0x000000ff}` : '') +
    ')'
  )
}

/**
 * Converts the values of RGB components to a hexadecimal color code
 * @param r
 * @param g
 * @param b
 * @returns
 */
function RGBToHex(r: string): string
function RGBToHex(r: number, g: number, b: number): string
function RGBToHex(r: string | number, g?: number, b?: number) {
  if (isNumber(r)) {
    if (g && b) return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')
  } else {
    const result = r.match(/(?<=\()(\d+),(\d+),(\d+)(?=\))/)
    if (result) {
      return result[0]
    } else {
      throw new Error('非法的rgb颜色')
    }
  }
}

export {
  _console,
  loadScript,
  immediateSetInterval,
  getTypeOfValue,
  getPropValue,
  deepMerge,
  willInject,
  formatTime,
  setObjToUrlParams,
  randomHexColorCode,
  hexToRGB,
  RGBToHex,
}
