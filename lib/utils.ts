import dayjs from 'dayjs'

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

export const _console: Console<string> = {
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
 * 从输入的内容中获取行政区域
 * @param val
 * @example
 * getRegion('淮南市人民检察院') 返回 '淮南市'
 */
export const getRegion = (val: string): string => {
  const tmp = val.match(/.+?(省|市|自治区|自治州|县|区)/g)
  if (tmp && tmp.length > 0) {
    return tmp[tmp.length - 1]
  } else {
    return ''
  }
}

/**
 * 以cdn形式引入插件，例如可以cdn引入echarts，这样可以显著减少打包的体积
 */
export const loadScript = (scriptURL: string, host: string) => {
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
export const immediateSetInterval = (func1: () => void, delayTime: number) => {
  setInterval(
    (function callback(func2: () => void) {
      func2()
      return callback
    })(func1),
    delayTime
  )
}

/**
 * 返回值的类型
 * @param value 任意值（经过toLowerCase处理）
 */
export const getTypeOfValue = (value: unknown) =>
  Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()

export const getPropValue = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key]
}

/**
 * 深度合并（若src中存在的键的值会被target覆盖，若src不存在，则会取target中的值）
 * @param src
 * @param target
 */
export const deepMerge = <T extends object>(src: T, target: any = {}): T => {
  let key: string
  for (key in target) {
    src[key] =
      getTypeOfValue(src[key]) === 'object'
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key])
  }
  return src
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
export const willInject = (
  func: (...args: any[]) => any,
  successCodes?: number[]
) => {
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
export const formatTime = (
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
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export const setObjToUrlParams = (baseUrl: string, obj: any): string => {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}
