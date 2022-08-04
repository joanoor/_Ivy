/**
 * 添加时间戳
 * @param join
 * @param restful
 */
export declare function addTimeStamp<T extends boolean>(join: boolean, restful?: T): T extends true ? string : object;
/**
 * @description: Format request parameter time
 */
export declare function formatRequestDate(params: Recordable): void;
