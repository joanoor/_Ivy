/**
 * 判断是否是某种类型
 */
import { isElement as isDomElement } from 'lodash-es'
import { default as isMyPromise } from 'is-promise'

export const isString = (val: unknown): val is string =>
  getTypeOfValue(val) === 'string'

export const isNumber = (val: unknown): val is number =>
  getTypeOfValue(val) === 'number'

export const isBoolean = (val: unknown): val is boolean =>
  getTypeOfValue(val) === 'boolean'

export const isArray = (val: any): val is Array<any> => Array.isArray(val)

export const isPlainObject = (val: unknown): val is Record<any, any> =>
  getTypeOfValue(val) === 'object'

export const isDate = (val: unknown): val is Date =>
  getTypeOfValue(val) === 'date'

export const isRegExp = (val: unknown): val is RegExp =>
  getTypeOfValue(val) === 'regexp'

export const isWindow = (val: unknown): val is Window =>
  typeof window !== 'undefined' && getTypeOfValue(val) === 'window'

export const isElement = <T = unknown>(val: T): val is T =>
  // isPlainObject(val) && !!val.tagName
  isDomElement(val)

export const isMap = (val: unknown): val is Map<any, any> =>
  getTypeOfValue(val) === 'map'

export const isNull = (val: unknown): val is null => val === null

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isUrl = (path: string): boolean => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/*************************我是分割线*************************/

/**
 * 是否为空数组 | 空字符串 | 空Map | 空Set | 空对象
 * @param val
 */
export const isEmpty = <T = unknown>(val: T): boolean => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }
  if (isPlainObject(val)) {
    return Object.keys(val).length === 0
  }
  return false
}

export const isDef = <T = unknown>(val?: T): val is T =>
  typeof val !== 'undefined'

export const isUnDef = <T = unknown>(val?: T): val is T => !isDef(val)

export const isNullOrUnDef = (val: unknown): val is null | undefined =>
  isUnDef(val) || isNull(val)

export const isPromise = <T = any>(val: any): val is Promise<T> =>
  isMyPromise(val)

/**
 * 判断是否 十六进制颜色值.
 * 输入形式可为 #fff000 #f00
 *
 * @param   String  color   十六进制颜色值
 * @return  Boolean
 */
export const isHexColor = (color: string) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color)
}

/**
 * 返回值的类型
 * @param value 任意值（经过toLowerCase处理）
 */
export const getTypeOfValue = (value: unknown) =>
  Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
