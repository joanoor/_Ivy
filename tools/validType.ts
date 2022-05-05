/**
 * 正则校验
 */

class Pattern {
  private readonly email = new RegExp(
    '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$'
  )
  private readonly url = new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i'
  )
  private readonly cn = /^[\u2E80-\uFE4F]+$/
  private readonly enName = /^[\da-zA-Z\s]{2,}$/
  private readonly cnName = /^[\u2E80-\uFE4F]{2,6}(?:·[\u2E80-\uFE4F]{2,6})*$/
  private readonly userName = /^[\da-zA-Z\u2E80-\uFE4F \s]{2,}$/
  private readonly carId =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  private readonly mobile = /^1[3456789]\d{9}$/
  private readonly address = /^[\da-zA-Z\u2E80-\uFE4F \s-]{4,400}$/

  private readonly date /* eslint-disable no-useless-escape */ =
    /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/
  private readonly numVcode = /^[0-9]{4,8}$/
  private readonly vcode = /^[a-zA-Z0-9]{4,8}$/
  private readonly code = /^[a-zA-Z0-9]{4,}$/
  private readonly hkMc = /^[WC][0-9]{8}$/
  private readonly taiWan = /^T[0-9]{8}$/
  private readonly passport =
    /^1[45][0-9]{7}|([E|e]\d{8})|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/
  private readonly num = /^[1-9][0-9]*$/
  private readonly decimal = /^(-)?\d+(\.\d)?$/ // 小数或负数，小数后面一位
  private readonly money =
    /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  private readonly id =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  private readonly twCome = /^(\d{8}|[a-zA-Z]\d{7})$/ // 台湾居民来往大陆通行证(台胞证)
  private readonly hmHid = /^8[123]0000\d{12}$/ // 港澳台居民居住证
  private readonly regionArea = /.+?(省|市|自治区|自治州|县|区)/g

  /**
   * 身份证规则检测
   * @param { string } value
   * @returns { boolean } true 符合身份证id规则，false不符合规则
   */
  testId(value: string): boolean {
    return this.id.test(value.trim())
  }

  /**
   * 检测是否为中文
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testCn(value: string): boolean {
    return this.cn.test(value.trim())
  }

  /**
   * 手机号码检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testMobile(value: string): boolean {
    return this.mobile.test(value.trim())
  }

  /**
   * 邮箱检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testEmail(value: string): boolean {
    return this.email.test(value.trim())
  }

  /**
   * URL检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testUrl(value: string): boolean {
    return this.url.test(value.trim())
  }

  /**
   * 车牌检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testCarId(value: string) {
    return this.carId.test(value.trim())
  }

  /**
   * 中文名检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testCnName(value: string) {
    return this.cnName.test(value.trim())
  }

  /**
   * 英文名检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testEnName(value: string) {
    return this.enName.test(value.trim())
  }

  /**
   * 用户名检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testUserName(value: string) {
    return this.userName.test(value.trim())
  }

  /**
   * 地址检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testAddress(value: string) {
    return this.address.test(value.trim())
  }

  /**
   * 日期检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testDate(value: string) {
    return this.date.test(value.trim())
  }
  /**
   * 数字验证码检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testNumVcode(value: string) {
    return this.numVcode.test(value.trim())
  }

  /**
   * 其它验证码检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testVcode(value: string) {
    return this.vcode.test(value.trim())
  }

  /**
   * 编码检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testCode(value: string) {
    return this.code.test(value.trim())
  }

  /**
   * 港澳通行证检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testHKMc(value: string) {
    return this.hkMc.test(value.trim())
  }

  /**
   * 台湾通行证检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testTaiWan(value: string) {
    return this.taiWan.test(value.trim())
  }

  /**
   * 护照检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testPassport(value: string) {
    return this.passport.test(value.trim())
  }

  /**
   * 整数检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testNum(value: string) {
    return this.num.test(value.trim())
  }

  /**
   * 小数或负数，小数后面一位检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testDecimal(value: string) {
    return this.decimal.test(value.trim())
  }

  /**
   * 金额检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testMoney(value: string) {
    return this.money.test(value.trim())
  }

  /**
   * 台胞证检测
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testTwCome(value: string) {
    return this.twCome.test(value.trim())
  }

  /**
   * 港澳台居民居住证
   * @date 2020-07-08
   * @param { string } value
   * @returns { boolean }
   */
  testHmHid(value: string) {
    return this.hmHid.test(value.trim())
  }

  /**
   * 从输入的内容中获取行政区域
   * @param val
   * @example
   * ```ts
   * matchRegion('淮南市人民检察院')
   * ==>'淮南市'
   *
   * matchRegion('aaa')
   * ==>null
   * ```
   */
  matchRegion(value: string) {
    return value.match(this.regionArea)
  }
}

const pattern = new Pattern()

export { pattern }
