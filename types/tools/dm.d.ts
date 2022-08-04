/**
 * dm(data manipulate: 数据操纵)
 */
export declare class DM {
    /**
     * 查找数组中重复值的index
     * @param arr 要查找的数组
     * @param key 生成指定key组成的数组
     *
     * @example
     *
     * const dm = new DM()
     * const indexes = dm.pickDuplicate([1,2,3])  // []
     * const indexes2 = dm.pickDuplicate([1,2,2,3])  // [1,2]
     * const indexes3 = dm.pickDuplicate([1, 2, 10, 5, 5, 7, 7, 9, 9, 9, 10]) // [[2, 10],[3, 4],[5, 6],[7, 8, 9]]
     */
    pickDuplicate(arr: any[], key?: any): number[][];
    /**
     * 获取数组的最大深度（也就是获取数组的维度。因为至少都是一维数组，所以deep默认为1）
     */
    getDepth(arr: any[], deep?: number): number;
    /**
     * 将数组按指定key转换成响应的对象
     * @param data
     * @param key
     */
    arrayToObject(data: Record<string, any>[], key: string): {};
}
