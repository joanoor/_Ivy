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
   * 发生在统一拦截之前，在请求发出前执行
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig

  /***********************************************************************/

  /**
   * request统一拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   * response统一拦截器
   *
   * 当http网络请求正常，接口正常返回数据（不论接口返回的状态码是不是正常的成功码）时，执行此方法。
   */
  responseInterceptors?: (res: AxiosResponse) => AxiosResponse

  /**
   * request统一拦截器，对request错误进行处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * response统一拦截器，对http网络错误进行处理
   *
   * 当http网络请求失败（网络响应状态代码status不是200），不论接口是否正常返回数据，都会执行此方法。
   */
  responseInterceptorsCatch?: (error: AxiosResponse) => void

  /***********************************************************************/

  /**
   * 发生在统一拦截之后，当请求接口成功时执行
   */
  transformRequestHook?: <T = Result>(
    res: AxiosResponse<T>,
    options: RequestOptions
  ) => any

  /**
   * 发生在统一拦截之后，当请求失败时执行
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>
}
