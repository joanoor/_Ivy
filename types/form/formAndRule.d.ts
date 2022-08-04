/**
  生成表单解构以及表单校验规则
 */
import type { Rules, RuleItem } from 'async-validator';
interface RuleItemExtend extends RuleItem {
    trigger: string;
}
export interface BaseStruct<T = string, R = boolean> {
    label: T;
    default: T | number;
    required: R;
    rule: RuleItemExtend[];
    id: T;
}
export declare type BaseStructs = BaseStruct[];
/**
 * 使用generateOptions方法，生成form以及formRule的返回对象（符合Element UI中表单校验格式）
 * @param formopts
 * @param baseFormAndRuleList
 * @param uniqIds 当我们把整个项目的表单数据整理到一个模块中，难免会出现重名的情况，这时，需要uniqId这个字符串数组，将id在uniqId中的表单提取出来
 * @example
 * ```js
 * const [_form, _rules] = generateFormAndRules(
     ['username', 'password'],
     baseFormAndRuleList
   )
   ```
 */
declare function generateFormAndRules(formopts: string[], baseFormAndRuleList: BaseStructs, uniqIds?: string[]): [Record<string, any>, Rules];
export { generateFormAndRules };
