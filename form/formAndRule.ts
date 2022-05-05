/**
  生成表单解构以及表单校验规则
 */

import { _console } from '../tools/utils'
import { isEmpty } from '../tools/is'
import type { Rules, RuleItem } from 'async-validator'

export interface BaseStruct<T = string, R = boolean> {
  label: T // form表单项名称
  default: T // form表单项默认值
  required: R // form表单项是否含有校验规则
  rule: RuleItem[] // form表单项校验规则
  id: T // form表单重名时，通过id来进行区分
}
export type BaseStructs = BaseStruct[]

/**
 * 生成form及formRule属性的工厂方法
 * @param opt
 * @param baseStruct
 * @param uniqId
 */
function optFactory(
  opt: string,
  baseStruct: BaseStructs,
  uniqId: string
  // eslint-disable-next-line @typescript-eslint/ban-types
): BaseStruct | {} {
  const index = !uniqId
    ? baseStruct.findIndex(v => v.label === opt)
    : baseStruct.findIndex(v => v.id === uniqId)
  return index > -1 ? baseStruct[index] : {}
}

/**
 * 使用optFactory方法，生成表单对象或者表单校验对象
 * @param array form表单对象的key值组成的字符串数组
 * @param baseFormAndRuleList 传入BaseStructs类型的数据
 * @param uniqId 可选。
 * @param type 可选。生成对象类型，表单对象不需要传，表单校验对象传入任意数据
 * @returns {Record<string, any> | Rules}
 */
function generateOptions(
  array: string[],
  baseFormAndRuleList: BaseStructs,
  uniqId = '',
  type = ''
): Record<string, any> | Rules {
  /**
   * 判断是否为BaseStruct类型
   * @param val
   */
  function isBaseStruct(val: unknown): val is BaseStruct<string, boolean> {
    return !isEmpty(val)
  }

  let result = {}
  if (baseFormAndRuleList.length === 0) {
    _console.error('generateOptions传参错误，为空数组')
  } else {
    try {
      result = array.reduce((acc, cur) => {
        const obj = optFactory(cur, baseFormAndRuleList, uniqId)
        if (isBaseStruct(obj)) {
          if (!type) obj.label && (acc[obj.label] = obj.default)
          else obj.label && obj.required && (acc[obj.label] = obj.rule)
        }
        return acc
      }, {})
    } catch (err) {
      _console.error(`出错了${err}`)
    }
  }
  return result
}

/**
 * 使用generateOptions方法，生成form以及formRule的返回对象
 * @param formopts 
 * @param baseFormAndRuleList 
 * @param uniqId 
 * @example
 * ```js
 * const { _form, _rules } = generateFormAndRules(
     ['username', 'password'],
     formAndRule
   )
   ```
 */
function generateFormAndRules(
  formopts: string[],
  baseFormAndRuleList: BaseStructs,
  uniqId?: string
): { _form: Record<string, any>; _rules: Rules }
function generateFormAndRules(formopts, baseFormAndRuleList, uniqId = '') {
  let _form = {}
  let _rules = {}
  if (formopts.length === 0) {
    _console.error('生成表单及表单规则出错，没有传入参数或传入参数不是非空数组')
  } else {
    _form = generateOptions(formopts, baseFormAndRuleList, uniqId)
    _rules = generateOptions(formopts, baseFormAndRuleList, uniqId, 'rule')
  }
  // return [_form, _rules]  // 虽然返回数组，但是解构赋值时，ts会提示“目标仅允许 2 个元素，但源中的元素可能不够”，因为没有固定长度
  return { _form, _rules }
}

export { generateFormAndRules }
