import type { InternalRuleItem, Value, Values, ValidateOption, SyncValidateResult } from 'async-validator';
interface ValidatorInterface {
    (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption): SyncValidateResult | void;
}
declare class FormChecker {
    scoreChecker(): ValidatorInterface;
    phoneChecker(): ValidatorInterface;
    easyPasswordChecker(): ValidatorInterface;
}
declare const formChecker: FormChecker;
export { formChecker };
