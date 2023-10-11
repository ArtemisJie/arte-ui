import classNames from "classnames";
import React, { FC, ReactElement, ReactNode, useContext, useEffect } from "react";
import { FormContext } from "./form";
import { CustomRule } from "./useStore";
import { RuleItem } from 'async-validator'
//Required表明这个值是必选的
//Omit可以忽略掉取出来的一部分
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
export interface FormItemProps {
    name: string;
    label?: string; //对应的表单中每一项的标签名
    children?: ReactNode;
    /**子节点的值的属性，如 checkbox 的是 'checked' */
    valuePropName?: string;
    /**设置收集字段值变更的时机 */
    trigger?: string;
    /**设置如何将 event 的值转换成字段值 */
    getValueFromEvent?: (event: any) => any;
    rules?: CustomRule[];
    validateTrigger?: string;
}
//借鉴ant-design的让store中根据用户输入来进行更新的方法
export const FormItem: FC<FormItemProps> = (props) => {
    const {
        label,
        children,
        name,
        valuePropName,
        trigger,
        getValueFromEvent,
        rules,
        validateTrigger,
        ...restProps
    } = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>
    const { dispatch, fileds, initialValues, validateFiled } = useContext(FormContext)
    const rowClass = classNames('row', {
        'row-no-label': !label
    })
    //获取store对应的value
    const filedState = fileds[name]
    const value = filedState && filedState.value
    const errors = filedState && filedState.errors
    const isRequired = rules?.some(rule => (typeof rule !== 'function') && rule.required)
    const hasError = errors && errors.length > 0
    const labelClass = classNames({
        'form-item-required': isRequired
    })
    const itemClass = classNames('form-item-control', {
        'form-item-has-errors': hasError
    })
    const onValueUpdate = (e: any) => {
        const value = getValueFromEvent(e) //默认input是e.target.value,但checkbox是.check
        // console.log('new value', value)
        dispatch({ type: 'updateValue', name, value })
    }
    const onValueValidate = async () => {
        await validateFiled(name)
    }
    //创建一个属性列表
    const controlProps: Record<string, any> = {}
    controlProps[valuePropName] = value //加!号是因为，valuePropName理应不是非空的，但是在定义的时候这个值是可选的，所以会出现一个undefined，但是属性不允许是undefined，所以加一个！（非空判定符）来表明这个不会是undefined
    controlProps[trigger] = onValueUpdate
    if (rules) {
        controlProps[validateTrigger] = onValueValidate
    }
    //获取 children 数组的第一个元素
    const childList = React.Children.toArray(children)
    if (childList.length === 0) {
        console.error('No child element found in FormItem, only one')
    }
    if (childList.length > 1) {
        console.warn('too much child element, only one')
    }
    if (!React.isValidElement(childList[0])) {
        console.error('Child element is not a valid React Element')
    }
    const child = childList[0] as ReactElement
    //cloneElement，混个这个child以及手动的属性列表
    const returnChildNode = React.cloneElement(
        child,
        {
            ...child.props,
            ...controlProps
        }
    )
    useEffect(() => {
        const value = (initialValues && initialValues[name]) || ''//初始值存在，且对应相应的fileds
        dispatch({ type: 'addFiled', name, value: { label, name, value, rules: rules || [], errors: [], isValid: true } })
    }, [])
    return (
        <div className={rowClass}>
            {label &&
                <div className="form-item-label">
                    <label title={label} className={labelClass}>
                        {label}
                    </label>
                </div>
            }
            <div className="form-item">
                <div className={itemClass}>
                    {returnChildNode}
                </div>
                {
                    hasError &&
                    <div className="form-item-explain">
                        <span>
                            {errors[0].message}
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}
FormItem.defaultProps = {
    valuePropName: 'value',
    trigger: 'onChange',
    getValueFromEvent: (e) => e.target.value,//如果是checkbox类型，则是e.target.check
    validateTrigger: 'onBlur',
}
export default FormItem