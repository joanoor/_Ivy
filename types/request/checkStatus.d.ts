import { ErrorMessageMode } from './types';
/**
 * 对网络请求返回状态进行处理
 * @param status
 * @param msg
 * @param errorMessageMode
 * @returns [string, string] 返回元组类型
 */
export declare function checkStatus(status: number, msg?: string, errorMessageMode?: ErrorMessageMode): [string, string];
