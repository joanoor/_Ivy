export declare const isString: (val: unknown) => val is string;
export declare const isNumber: (val: unknown) => val is number;
export declare const isBoolean: (val: unknown) => val is boolean;
export declare const isArray: (val: any) => val is any[];
export declare const isObject: (val: unknown) => val is Record<any, any>;
export declare const isDate: (val: unknown) => val is Date;
export declare const isRegExp: (val: unknown) => val is RegExp;
export declare const isWindow: (val: unknown) => val is Window;
export declare const isElement: <T = unknown>(val: T) => val is T;
export declare const isMap: (val: unknown) => val is Map<any, any>;
export declare const isNull: (val: unknown) => val is null;
export declare const isServer: boolean;
export declare const isClient: boolean;
export declare const isFunction: (val: unknown) => val is Function;
export declare const isUrl: (path: string) => boolean;
/*************************我是分割线*************************/
/**
 * 是否为空数组 | 空字符串 | 空Map | 空Set | 空对象
 * @param val
 */
export declare const isEmpty: <T = unknown>(val: T) => boolean;
export declare const isDef: <T = unknown>(val?: T | undefined) => val is T;
export declare const isUnDef: <T = unknown>(val?: T | undefined) => val is T;
export declare const isNullOrUnDef: (val: unknown) => val is null | undefined;
export declare const isPromise: <T = any>(val: any) => val is Promise<T>;
/**
 * 判断是否 十六进制颜色值.
 * 输入形式可为 #fff000 #f00
 *
 * @param   String  color   十六进制颜色值
 * @return  Boolean
 */
export declare const isHexColor: (color: string) => boolean;
/**
 * 返回值的类型
 * @param value 任意值（经过toLowerCase处理）
 */
export declare const getTypeOfValue: (value: unknown) => string;
