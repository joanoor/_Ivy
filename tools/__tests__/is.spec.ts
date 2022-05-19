import {
  getTypeOfValue,
  isArray,
  isBoolean,
  isClient,
  isDate,
  isDef,
  isElement,
  isEmpty,
  isFunction,
  isHexColor,
  isMap,
  isNull,
  isNullOrUnDef,
  isNumber,
  isObject,
  isPromise,
  isRegExp,
  isServer,
  isString,
  isUnDef,
  isUrl,
  isWindow,
} from '../is'

describe(`test "is" module`, () => {
  test('isString', () => {
    expect(isString('')).toBe(true)
    expect(isString('hello world')).toBe(true)
    expect(isString(123)).not.toBe(true)
    expect(isString(Symbol('a'))).not.toBe(true)
  })

  test('isNumber', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber('')).not.toBe(true)
    expect(isNumber(123)).toBe(true)
  })

  test('isBoolean', () => {
    expect(isBoolean(!null)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(true)).toBe(true)
  })

  test('isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, null, undefined])).toBe(true)
    expect(isArray(0)).not.toBe(true)
  })

  test('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(new Date())).not.toBe(true)
    expect(isObject(null)).not.toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  test('isDate', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate('2022-05-19')).not.toBe(true)
    expect(isDate(Date)).not.toBe(true)
  })

  test('isRegExp', () => {
    expect(isRegExp(new RegExp('a'))).toBe(true)
    expect(isRegExp(/\d+/)).toBe(true)
    expect(isRegExp('aaa')).not.toBe(true)
  })

  test('isWindow', () => {
    expect(isWindow(window)).toBe(true)
  })

  test('isElement', () => {
    document.body.innerHTML = `
      <div id="app"></div>
    `
    expect(isElement(document)).not.toBe(true)
    expect(isElement(document.getElementById('app'))).toBe(true)
    expect(isElement(document.querySelector('div'))).toBe(true)
  })

  test('isMap', () => {
    expect(isMap(new Map())).toBe(true)
    expect(isMap({ a: 1 })).not.toBe(true)
    expect(isMap(new WeakMap())).not.toBe(true)
    expect(isMap(new Map())).toBe(true)
  })

  test('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(void 0)).not.toBe(true)
  })

  test('isServer and isClient', () => {
    expect(isServer).toBe(!isClient)
  })

  test('isFunction', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(console.log)).toBe(true)
    expect(isFunction(test)).toBe(true)
    expect(isFunction(123)).not.toBe(true)
  })

  test('isUrl', () => {
    expect(isUrl('https://www.baidu.com')).toBe(true)
    expect(isUrl('https://jestjs.io/docs/troubleshooting#debugging')).toBe(true)
    expect(isUrl('http:///www.baidu')).toBe(true)
  })

  test('isEmpty', () => {
    expect(isEmpty(null)).not.toBe(true)
    expect(isEmpty(undefined)).not.toBe(true)
    expect(isEmpty(0)).not.toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
  })

  test('isDef and is UnDef', () => {
    const a = ''
    expect(isDef(a)).toBe(!isUnDef(a))
    expect(isDef(undefined)).toBe(false)
    expect(isUnDef(undefined)).toBe(true)
  })

  test('isNullOrUnDef', () => {
    expect(isNullOrUnDef(null)).toBe(true)
    expect(isNullOrUnDef(undefined)).toBe(true)
    expect(isNullOrUnDef('')).not.toBe(true)
  })

  test('isPromise', () => {
    const aPromise = new Promise((resolve, reject) => {
      resolve({})
    })
    expect(isPromise(aPromise)).toBe(true)
    expect(isPromise(Promise)).not.toBe(true)
    expect(isFunction(aPromise.then)).toBe(true)
    expect(isFunction(aPromise.catch)).toBe(true)
  })

  test('isHexColor', () => {
    expect(isHexColor('#fff')).toBe(true)
    expect(isHexColor('#ffffff')).toBe(true)
    expect(isHexColor('ffffff')).not.toBe(true)
    expect(isHexColor('rgb(255,255,255)')).not.toBe(true)
  })

  test('getTypeOfValue', () => {
    expect(getTypeOfValue('a')).toBe('string')
    expect(getTypeOfValue({})).toBe('object')
    expect(getTypeOfValue(new Date())).toBe('date')
    expect(getTypeOfValue([1, 2, 3])).toBe('array')
    expect(getTypeOfValue(new Map())).toBe('map')
  })

  const t = Promise.resolve({})
})
