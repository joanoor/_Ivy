import type { AxiosResponse } from 'axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { deepMerge, setObjToUrlParams } from '../tools/utils'
import { isString } from '../tools/is'
import { formatRequestDate, addTimeStamp } from './helper'
import { RequestEnum, ContentTypeEnum } from './types'
import { IAxios } from './Axios'

// transform的默认值
const defaultTransform: AxiosTransform = {
  beforeRequestHook(config, options) {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTimestamp = true,
      urlPrefix,
    } = options
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          addTimeStamp(joinTimestamp, false)
        )
      } else {
        // 兼容restful风格
        config.url =
          config.url + params + `${addTimeStamp(joinTimestamp, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * response拦截器
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
}

/**
 * 工厂函数，创建axios实例
 * @param opt
 * eg:
 * const axiosInstance = creaeAxios(opt)
 */
export const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new IAxios(
    deepMerge<CreateAxiosOptions>(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 6000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: defaultTransform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          joinPrefix: false,
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'message',
          joinTimestamp: true,
          ignoreCancelToken: true,
          withToken: true,
        },
      },
      opt || {}
    )
  )
}

export * from './types'
export * from './axiosTransform'
export * from './checkStatus'
export * from './helper'
