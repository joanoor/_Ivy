import { pattern } from '../tools/validType'
import type {
  InternalRuleItem,
  Value,
  Values,
  ValidateOption,
  SyncValidateResult,
} from 'async-validator'

interface ValidatorInterface {
  (
    rule: InternalRuleItem,
    value: Value,
    callback: (error?: string | Error) => void,
    source: Values,
    options: ValidateOption
  ): SyncValidateResult | void
}

class FormChecker {
  scoreChecker(): ValidatorInterface {
    return (rule, value, callback) => {
      console.log(value, 'value')
      if (!value || value === '') {
        callback(new Error('请输入得分规则'))
      } else {
        callback()
      }
    }
  }

  phoneChecker(): ValidatorInterface {
    return (rule, value, callback) => {
      if (!pattern.testMobile(value.trim())) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
  }

  easyPasswordChecker(): ValidatorInterface {
    return (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度范围在6-20位'))
      } else {
        callback()
      }
    }
  }
}

const formChecker = new FormChecker()

export * from './formAndRule'
export { formChecker }
