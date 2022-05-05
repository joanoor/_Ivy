import qs from 'qs'
import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import type { CreateAxiosOptions } from './axiosTransform'
import { AxiosCanceler } from './axiosCancel'
import { cloneDeep } from 'lodash-es'
import { ContentTypeEnum, RequestEnum, RequestOptions, Result } from './types'
import { isFunction } from '../tools/is'
import { UploadFileParams } from './types'
import { _console } from '../tools/utils'

/**
 * 封装axios
 * 参考：
 *
 * https://juejin.cn/post/6916682684169191437 
 *
 * https://segmentfault.com/a/1190000040457067
 
 * 可以注册多个拦截器，对于request拦截器，使用unshift方法
 * 对于response拦截器，使用的是push
 */
export class IAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  /**
   * 构造器生成axios实例
   * @param config
   */
  constructor(config: CreateAxiosOptions) {
    this.options = config
    this.axiosInstance = axios.create(config)
    this.setupInterceptors()
  }

  /**
   * 创建axios实例
   * @param config CreateAxiosOptions类型
   */
  private createAxios(config: CreateAxiosOptions) {
    this.axiosInstance = axios.create(config)
  }

  /**
   * 获取new IAxios实例时传入的参数中的transform属性值
   */
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  /**
   * 获取axios实例
   */
  getAxiosInstance() {
    return this.axiosInstance
  }

  /**
   * 配置axios实例，若存在axios实例则什么也不做，否则生成axios实例
   * @param config
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) return
    this.createAxios(config)
  }

  /**
   * 设置自定义实例默认headers
   * @param headers
   */
  setHeader(headers: any) {
    if (!this.axiosInstance) {
      return
    } else {
      Object.assign(this.axiosInstance.defaults.headers, headers)
    }
  }

  /**
   * 设置统一拦截
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) return
    // 统一拦截的方法放在了transform中
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    // request拦截器(当接口请求没有出错时执行)
    const axiosCanceler = new AxiosCanceler()
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          headers: { ignoreCancelToken },
        } = config

        const ignoreCancel = ignoreCancelToken
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken

        // 当ignoreCancel不为真的时候，将请求添加进pendingMap中
        !ignoreCancel && axiosCanceler.addPending(config)

        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options)
        }
        return config
      },
      undefined
    )

    // request拦截器(当接口请求出错时执行)
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      )

    // response拦截器(当接口返回没有出错时执行)
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // response拦截器(当接口返回出错时执行)
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      )
  }

  /**
   * 通过判断是否以application/x-www-form-urlencoded来进行post请求，对config进行处理
   * @param config
   */
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    // 当Content-Type不是application/x-www-form-urlencoded，并且请求体中没有data，且请求方法为get时，什么也不做，直接返回config
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }
    // 否则，对data进行qs序列化处理，转换成key1=value1&key2=value2这种样式
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  /**
   * 使用element UI上传组件
   * 上传文件的时候，必须使用multipart/form-data这种方式
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach(key => {
        const value = params.data?.[key]
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data?.[key])
      })
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ignoreCancelToken: true,
      },
    })
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {}
    beforeRequestHook &&
      isFunction(beforeRequestHook) &&
      (conf = beforeRequestHook(conf, opt))
    conf.requestOptions = opt
    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('请求出错，请稍候重试'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }

  /**
   * 下载文件流，此时要直接返回native response
   * @param config
   * @param options
   */
  async downloadByStream<T>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ) {
    const res = await this.request(config, options)
    try {
      const fileName = res.headers['content-disposition']?.split('"')
      const aLink = document.createElement('a')
      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
      })
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      const ev = new Event('click', { bubbles: false })
      aLink.dispatchEvent(ev)
      aLink.click()
    } catch (err) {
      _console.error('下载流文件出错了，详细错误信息如下：')
      console.error(err)
    }
  }
}
