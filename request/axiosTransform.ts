/**
 * 对请求的数据进行处理
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions, Result } from './types'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

/**
 * 定义一个转换数据抽象类
 */
export abstract class AxiosTransform {
  /**
   * 在请求发出前执行
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig

  /**
   * 在请求成功时执行
   */
  transformRequestHook?: <T = Result>(
    res: AxiosResponse<T>,
    options: RequestOptions
  ) => any

  /**
   * 在请求失败时执行
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * request拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   * response拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * request拦截器对错误进行处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * response拦截器对错误进行处理
   */
  responseInterceptorsCatch?: (error: Error) => void
}
