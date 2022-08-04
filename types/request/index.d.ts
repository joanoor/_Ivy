import type { CreateAxiosOptions } from './axiosTransform';
import { IAxios } from './Axios';
/**
 * 工厂函数，创建axios实例
 * @param opt
 * eg:
 * const axiosInstance = creaeAxios(opt)
 */
export declare const createAxios: (opt?: Partial<CreateAxiosOptions> | undefined) => IAxios;
export * from './axiosTransform';
export * from './checkStatus';
export * from './helper';
export * from './types';
