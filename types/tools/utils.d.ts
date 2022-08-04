/// <reference types="webpack-env" />
import qs from 'qs';
export { _console, // print colorfull
scrollToTop, // scroll to top
autoImport, // auto import module with webpack
loadScript, // load script as promise
PollingAction, // polling 轮询
getPropValue, // get prop value of a object
deepMerge, // deep merge
setObjToUrlParams, randomHexColorCode, hexToRGB, RGBToHex, toThousands, arrScrambling, // shuffle the array 打乱数组
randomString, // generate a random string of specified length 生成随机指定长度的字符串
fistLetterUpper, strToAsterisk, // add an asterisk in the middle of the string
chineseMoney, // convert numeric amounts to Chinese capitalized amounts 金额转换成中文大写金额
toFullScreen, exitFullscreen, openWindow, approximatelyEqual, sleep, getUrlQuery, getBrowserInfo, };
interface Console<T = string> {
    log: (str: T) => void;
    warn: (str: T) => void;
    error: (str: T) => void;
    success: (str: T) => void;
}
/**
 * 预定义四种console.log的颜色
 */
declare const _console: Console<string>;
declare const scrollToTop: (element: HTMLElement) => void;
/**
 * webpack项目自动引入某一目录下js|ts文件或者样式文件
 * @param files require.context
 * @param typeName script 表示js文件，style 表示样式文件，mixin 表示全局混入
 * @param ignores 表示忽略的文件，哪些不需要自动引入的文件，写在这里
 */
/**
 *  @deprecated
 */
declare function autoImport(files: __WebpackModuleApi.RequireContext, typeName: 'script' | 'style' | 'mixin', ignores?: string[]): any;
/**
 * 以promise的方式在html的head中添加script文件，例如可以cdn引入echarts，这样可以显著减少打包的体积
 * @param scriptURL {string}  你的库文件的链接
 * @param placeHolder {string}  scriptURL中的一个子字符串
 */
declare const loadScript: (scriptURL: string, placeHolder: string) => Promise<unknown>;
/**
 * 设置轮询
 * @param callback 轮询执行的回调函数
 * @param time  轮询的时间间隔
 * @param immediate 是否立刻执行 true: 是 | false: 否
 */
declare class PollingAction {
    private time;
    private immediate;
    private callback;
    private timer;
    constructor(callback: AnyFunction, time?: number, immediate?: boolean);
    start(): void;
    cancel(): void;
}
/**
 * 返回指定对象属性的值
 * @param obj
 * @param key
 * @returns
 */
declare const getPropValue: <T, K extends keyof T>(obj: T, key: K) => T[K];
/**
 * 深度合并
 * @param target
 * @param src
 */
declare const deepMerge: <T extends object>(target: T, ...srcs: any[]) => T;
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * @example
 * ```ts
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 * ```
 */
declare const setObjToUrlParams: (baseUrl: string, obj: any) => string;
/**
 * Generates a random hexadecimal color code
 * 生成随机的十六进制颜色代码
 * @returns {string}
 */
declare const randomHexColorCode: () => string;
/**
 * Converts a color code to an rgb() or rgba() string if alpha value is provided
 * @param hex
 * @returns
 */
declare const hexToRGB: (hex: string) => string;
/**
 * Converts the values of RGB components to a hexadecimal color code
 * @param r
 * @param g
 * @param b
 * @returns
 */
declare function RGBToHex(r: string): string;
declare function RGBToHex(r: number, g: number, b: number): string;
/**
 * 将一串数字转换成数字千分位的写法 '1,234'
 * @param n
 * @returns
 */
declare function toThousands(n: number): string;
/**
 * 数组乱序
 * @param arr
 * @returns
 */
declare function arrScrambling<T>(arr: T[]): T[];
/**
 * 生成指定长度的随机字符串
 * @param len 字符串长度
 */
declare function randomString(len: number): string;
/**
 * 字符串首字母大写
 * @param str
 * @returns
 */
declare function fistLetterUpper(str: string): string;
/**
 * 将字符串中间指定区间字符替换成指定字符串
 * 默认是将手机号码中间4位替换成'*'
 * @param str
 * @returns
 */
declare function strToAsterisk(str: string, start?: number, end?: number, fill?: string): string;
/**
 * 将数字转化为汉字大写金额
 */
declare function chineseMoney(n: number): string;
/**
 * 打开浏览器全屏
 */
/**
 * @deprecated
 */
declare function toFullScreen(): void;
/**
 * 退出浏览器全屏
 */
/**
 * @deprecated
 */
declare function exitFullscreen(): void;
/**
 * 打开一个新的浏览器窗体
 * @param url
 * @param windowName
 * @param width
 * @param height
 */
/**
 * @deprecated
 */
declare function openWindow(url: string, windowName: string, width: number, height: number): void;
/**
 * Checks if two numbers are approximately equal to each other
 * @param v1
 * @param v2
 * @param epsilon
 * @returns
 */
declare const approximatelyEqual: (v1: number, v2: number, epsilon?: number) => boolean;
/**
 * javascript version sleep
 * @param ms number
 * @returns
 */
declare const sleep: (ms: number) => Promise<unknown>;
/**
 * 获取当前URL中的query对象
 * @param type 默认是'hash'（适用于vue等单页面富应用）
 * @returns
 */
declare const getUrlQuery: (type?: 'hash' | 'history') => qs.ParsedQs;
/**
 * 获取浏览器版本信息
 * @returns
 */
declare function getBrowserInfo(): RegExpMatchArray | "IE/7" | "IE/8" | "IE/9" | "IE/10" | "IE/11" | "IE/edge" | null | undefined;
/**
 * Merge the contents of two or more objects together into the first object.
 * 暂时没有用上
 */
/*************下面的代码是封装promise请求*************/
/**
 * 返回经过封装的promise或者函数，可以被注入到vue.prototype上
 * @param {function} func:(...args:any[])=>any
 * @returns {function}
 */
/****************************************************/
/**
 * 对象深拷贝
 * @param obj
 * @param hash
 * @returns
 */
