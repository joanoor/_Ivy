/**
 * 正则校验
 */
declare class Pattern {
    readonly email: RegExp;
    readonly url: RegExp;
    readonly allchinese: RegExp;
    readonly chinese: RegExp;
    readonly carId: RegExp;
    readonly mobile: RegExp;
    readonly date: RegExp;
    readonly hkMc: RegExp;
    readonly taiWan: RegExp;
    readonly passport: RegExp;
    readonly num: RegExp;
    readonly decimal: RegExp;
    readonly idCardNo: RegExp;
    readonly twCome: RegExp;
    readonly hmHid: RegExp;
    /**
     * 身份证规则检测
     * @param { string } value
     * @returns { boolean } true 符合身份证id规则，false不符合规则
     */
    testIdCardNo(value: string): boolean;
    /**
     * 检测是否为中文
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testCn(value: string): boolean;
    /**
     * 手机号码检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testMobile(value: string): boolean;
    /**
     * 邮箱检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testEmail(value: string): boolean;
    /**
     * URL检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testUrl(value: string): boolean;
    /**
     * 车牌检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testCarId(value: string): boolean;
    /**
     * 日期检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testDate(value: string): boolean;
    /**
     * 港澳通行证检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testHKMc(value: string): boolean;
    /**
     * 台湾通行证检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testTaiWan(value: string): boolean;
    /**
     * 护照检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testPassport(value: string): boolean;
    /**
     * 整数检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testNum(value: string): boolean;
    /**
     * 检测是否为小数
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testDecimal(value: string): boolean;
    /**
     * 台胞证检测
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testTwCome(value: string): boolean;
    /**
     * 港澳台居民居住证
     * @date 2020-07-08
     * @param { string } value
     * @returns { boolean }
     */
    testHmHid(value: string): boolean;
    /**
     * 校验字符串中是否包含emoji表情
     * @param value
     * @returns
     */
    testEmoji: (value: string) => boolean;
}
declare const pattern: Pattern;
export { pattern };
