import axios from 'axios'
import type { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction } from '../tools/is'

let pendingMap = new Map<string, Canceler>()
export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&')

export class AxiosCanceler {
  /**
   * 将request放入pendingMap中
   * @param config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * 清空pendingMap中的全部request
   */
  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * 删除pendingMap中指定的request
   * @param config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && isFunction(cancel) && cancel()
      pendingMap.delete(url)
    }
  }

  /**
   * 重置pendingMap
   */
  reset() {
    pendingMap = new Map<string, Canceler>()
  }
}
