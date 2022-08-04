import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { CreateAxiosOptions } from './axiosTransform';
import { RequestOptions } from './types';
/**
 * 封装axios
 *
 * 参考：
 *
 * https://juejin.cn/post/6916682684169191437
 * https://segmentfault.com/a/1190000040457067
 *
 * 可以注册多个拦截器，对于request拦截器，使用unshift方法
 *
 * 对于response拦截器，使用的是push
 */
export declare class IAxios {
    private axiosInstance;
    private readonly options;
    /**
     * 构造器生成axios实例
     * @param config
     */
    constructor(config: CreateAxiosOptions);
    /**
     * 创建axios实例
     * @param config CreateAxiosOptions类型
     */
    private createAxios;
    /**
     * 获取new IAxios实例时传入的参数中的transform属性值
     */
    private getTransform;
    /**
     * 获取axios实例
     */
    getAxiosInstance(): AxiosInstance;
    /**
     * 配置axios实例，若存在axios实例则什么也不做，否则生成axios实例
     * @param config
     */
    configAxios(config: CreateAxiosOptions): void;
    /**
     * 设置自定义实例默认headers
     * @param headers
     */
    setHeader(headers: any): void;
    /**
     * 设置统一拦截
     */
    private setupInterceptors;
    /**
     * 通过判断是否以application/x-www-form-urlencoded来进行post请求，对config进行处理
     * @param config
     */
    supportFormData(config: AxiosRequestConfig): AxiosRequestConfig<any>;
    /**
     * 在项目表单中上传文件，可能有多种情况：
     * 1. 先上传文件，然后将接口返回的链接作为参数，提交表单时，一并提交；但这种情况没有考虑取消提交表单；
     * 2. 文件和表单的其他字段，比如：用户名，手机号码等等，在一起一并提交；这种方式可以取消表单，文件不会上传；
     *
     * 使用element UI上传组件
     * 上传文件的时候，必须使用multipart/form-data这种方式
     */
    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
}
