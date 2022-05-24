import { pattern } from '../validType'

describe('测试validType模块', () => {
  test('测试testId', () => {
    const mockTestId = jest.spyOn(pattern, 'testId')

    expect(pattern.testId('aaaa')).not.toBe(true)
    expect(mockTestId).toBeCalledTimes(1)
    expect(pattern.testId('')).not.toBe(true)
    expect(pattern.testId('340404199911252167')).toBe(true)
  })

  test('测试testCn', () => {
    const mockTestCn = jest.spyOn(pattern, 'testCn')

    expect(pattern.testCn('aaaa')).not.toBe(true)
    expect(mockTestCn).toBeCalledTimes(1)
    expect(pattern.testId('')).not.toBe(true)
    expect(pattern.testId('你好')).toBe(true)
    expect(pattern.testId('龍')).toBe(true)
  })

  test('测试testMobile', () => {
    const mockTestMobile = jest.spyOn(pattern, 'testMobile')

    expect(pattern.testMobile('17755449194')).toBe(true)
    expect(mockTestMobile).toBeCalledTimes(1)

    expect(pattern.testMobile('1554242')).not.toBe(true)
    expect(mockTestMobile).toBeCalledTimes(2)

    expect(pattern.testMobile('')).not.toBe(true)
    expect(mockTestMobile).toBeCalledTimes(3)
  })

  test('测试testEmail', () => {
    const mockTestEmail = jest.spyOn(pattern, 'testEmail')
    expect(pattern.testEmail('1554353@qq.com')).toBe(true)
    expect(mockTestEmail).toBeCalledTimes(1)

    expect(pattern.testEmail('j@1')).not.toBe(true)
    expect(mockTestEmail).toBeCalledTimes(2)
    console.log(mockTestEmail)
  })

  test('测试testUrl', () => {
    const mockTestUrl = jest.spyOn(pattern, 'testUrl')

    expect(pattern.testUrl('www.google.com')).not.toBe(true)
    expect(mockTestUrl).toBeCalledTimes(1)

    expect(
      pattern.testUrl('http://wwww.google.com/1273648383/index.html#read')
    ).toBe(true)
    expect(mockTestUrl).toBeCalledTimes(2)

    expect(pattern.testUrl('mailto://joanoor@outlook.com')).toBe(true)
    expect(mockTestUrl).toBeCalledTimes(3)
  })

  test('测试汽车牌照testCarId', () => {
    const mockTestCarId = jest.spyOn(pattern, 'testCarId')

    expect(pattern.testCarId('皖DHN0554A')).toBe(true)
    expect(mockTestCarId).toBeCalledTimes(1)

    expect(pattern.testCarId('皖AHN05A')).not.toBe(true)
    expect(mockTestCarId).toBeCalledTimes(2)
  })

  test('测试中文姓名testCnName', () => {
    const mockTestCnName = jest.spyOn(pattern, 'testCnName')

    expect(pattern.testCnName('刘备')).toBe(true)
    expect(pattern.testCnName('奥巴马')).toBe(true)
    expect(pattern.testCnName('海上沈明月')).toBe(true)
    expect(pattern.testCnName('')).not.toBe(true)
    expect(pattern.testCnName('说R')).not.toBe(true)
    expect(mockTestCnName).toBeCalledTimes(5)
  })

  test('测试英文姓名testEnName', () => {
    const mockTestEnName = jest.spyOn(pattern, 'testEnName')
    expect(pattern.testEnName('joanoor')).toBe(true)
    expect(pattern.testEnName('Donald John Trump')).toBe(true)
    expect(mockTestEnName.mock.calls[1][0]).toBe('joanoor')
    expect(pattern.testEnName('Donald 3Trump')).not.toBe(true)
  })

  test('测试是否是日期testDate', () => {
    const mockTestDate = jest.spyOn(pattern, 'testDate')

    expect(pattern.testDate('2012-10-10')).toBe(true)
    expect(pattern.testDate('20-20-20')).not.toBe(true)
    expect(
      pattern.testDate('2022-10-10 21:04:53 GMT+0800 (中国标准时间)')
    ).not.toBe(true)
    expect(mockTestDate).toBeCalledTimes(3)
  })

  test('测试4到8位的数字验证码', () => {
    expect(pattern.testNumVcode('0182')).toBe(true)
    expect(pattern.testNumVcode('03030303')).toBe(true)
    expect(pattern.testNumVcode('02')).not.toBe(true)
    expect(pattern.testNumVcode('09dfadf')).not.toBe(true)
  })

  test('测试4到8位的验证码', () => {
    expect(pattern.testNumVcode('0182')).toBe(true)
    expect(pattern.testNumVcode('03030303')).toBe(true)
    expect(pattern.testNumVcode('02')).not.toBe(true)
    expect(pattern.testNumVcode('09dfadf')).toBe(true)
  })

  test('测试港澳通行证', () => {
    expect(pattern.testHKMc('W0300')).not.toBe(true)
    expect(pattern.testHKMc('04948484')).not.toBe(true)
    expect(pattern.testHKMc('C03945837')).toBe(true)
  })

  test('测试台湾通行证', () => {
    expect(pattern.testTaiWan('T04040404')).toBe(true)
    expect(pattern.testTaiWan('9486048')).not.toBe(true)
    expect(pattern.testTaiWan('T0000000a')).not.toBe(true)
    expect(pattern.testTaiWan('T00000000')).toBe(true)
  })

  test('测试护照', () => {
    expect(pattern.testPassport('E75647464')).toBe(true)
  })

  test('测试是否为整数', () => {
    expect(pattern.testNum('123')).toBe(true)
    expect(pattern.testNum('0123')).toBe(true)
  })

  test('测试是否为小数', () => {
    expect(pattern.testDecimal('0.1111')).toBe(true)
  })

  test('测试是否为金融数字写法', () => {
    expect(pattern.testMoney('did')).toBe(false)
    expect(pattern.testMoney('111.111')).toBe(true)
  })

  test('测试是否为台胞证', () => {
    expect(pattern.testTwCome('ddd')).toBe(false)
  })

  test('测试是否为港澳台居民居住证', () => {
    expect(pattern.testHmHid('dddd')).toBe(false)
  })
})
