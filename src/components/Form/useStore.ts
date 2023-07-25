import { useReducer, useState } from "react";
import Schema, { RuleItem, ValidateError } from "async-validator";
import { mapValues, each } from "lodash-es";


//@ts-ignore
export type CustomRuleFunc = ({ getFiledValue }) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunc
export interface FiledDetail {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}

export interface FiledsState {
    [key: string]: FiledDetail
}

export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}

export interface FormState {
    isValid: boolean;
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>
}

export interface FiledAction {
    type: 'addFiled' | 'updateValue' | 'updateValidateResult';
    name: string;//确定操作哪个字段
    value: any;
}
function filedReducer(state: FiledsState, action: FiledAction): FiledsState {
    switch (action.type) {
        case 'addFiled':
            return {
                ...state,
                [action.name]: { ...action.value }
            }
        case 'updateValue':
            return {
                ...state,
                [action.name]: { ...state[action.name], value: action.value }
            }
        case 'updateValidateResult': {
            const { isValid, errors } = action.value
            return {
                ...state,
                [action.name]: { ...state[action.name], isValid, errors }
            }
        }
        default:
            return state
    }
}
export default function useStore(initialValues?: Record<string, any>) {
    const [form, setForm] = useState<FormState>({ isValid: true, isSubmitting: false, errors: {} })
    const [fileds, dispatch] = useReducer(filedReducer, {})
    const getFiledValue = (key: string) => { //获取对应值
        return fileds[key] && fileds[key].value
    }
    const getFiledsValue = () => {
        return mapValues(fileds, item => item.value)
    }
    const setFiledValue = (name: string, value: any) => {
        if (fileds[name]) {
            dispatch({ type: 'updateValue', name, value })
        }
    }
    const resetFileds = () => {
        if (initialValues) {
            each(initialValues, (value, name) => {
                if (fileds[name]) {
                    dispatch({ type: 'updateValidateResult', name, value })
                }
            })
        }
    }
    const transfromRules = (rules: CustomRule[]) => {
        return rules.map(rule => { //因为我们需要ruleItem类型的，所以遇到自定义的rule要先转化为ruleItem
            if (typeof rule === 'function') {
                return rule({ getFiledValue })
            } else {
                return rule
            }
        })
    }
    //验证规则
    const validateFiled = async (name: string) => {
        const { value, rules } = fileds[name]
        const afterRules = transfromRules(rules)

        const descriptor = {
            [name]: afterRules
        }
        const valueMap = {
            [name]: value
        }
        const validator = new Schema(descriptor)
        let isValid = true
        let errors: ValidateError[] = []
        try {
            await validator.validate(valueMap)
        } catch (e) {
            isValid = false
            const err = e as any
            errors = err.errors;

        } finally {
            dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } })
        }
    }
    const validateAllfieds = async () => {
        let isValid = true
        let errors: Record<string, ValidateError[]> = {}
        const valueMap = mapValues(fileds, item => item.value)
        const descriptor = mapValues(fileds, item => transfromRules(item.rules))
        const validator = new Schema(descriptor)
        setForm({ ...form, isSubmitting: true })
        try {
            await validator.validate(valueMap)
        } catch (e) {
            isValid = false
            const err = e as ValidateErrorType
            errors = err.fields;
            each(fileds, (value, name) => {
                //errors中有对应的key
                if (errors[name]) {
                    const itemErrors = errors[name]
                    dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors } })
                } else if (value.rules.length > 0 && !errors[name]) {// 有rules且无errors
                    dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: {} } })
                }
            })
        } finally {
            setForm({ ...form, isSubmitting: false, isValid, errors })
        }
        return {
            isValid,
            errors,
            values: valueMap
        }
    }
    return {
        fileds,
        dispatch,
        form,
        validateFiled,
        getFiledValue,
        validateAllfieds, 
        getFiledsValue,
        setFiledValue,
        resetFileds
    }
}