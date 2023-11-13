import React, { ReactNode, createContext, forwardRef, useImperativeHandle } from "react";
import useStore, { FormState } from "./useStore";
import { ValidateError } from 'async-validator'

export type RenderProps = (form: FormState) => ReactNode

export interface FormProps {
    name?: string;
    /**表单默认值，只有初始化以及重置时生效 */
    initialValues?: Record<string, unknown>;
    children?: ReactNode | RenderProps;
    /**提交表单且数据验证成功后回调事件 */
    onFinsh?: (values: Record<string, unknown>) => void;
    /**提交表单且数据验证失败后回调事件 */
    onFinshFailed?: (values: Record<string, unknown>, errors: Record<string, ValidateError[]>) => void;
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fileds' | 'validateFiled'> //利用ReturnType获取一个函数返回的的所有类型，再利用Pick获取某一个的类型
    & Pick<FormProps, 'initialValues'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

export type IFormRef = Omit<ReturnType<typeof useStore>, 'fileds' | 'dispatch' | 'form'>

export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
    const {
        name,
        children,
        initialValues,
        onFinsh,
        onFinshFailed,
    } = props;
    //validateFiled是用来验证的
    const { form, fileds, dispatch, ...restProps } = useStore(initialValues)
    const { validateFiled, validateAllfieds } = restProps
    useImperativeHandle(ref, () => {
        return {
            ...restProps
        }
    })

    const passContext: IFormContext = {
        dispatch,
        fileds,
        initialValues,
        validateFiled
    }
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const { isValid, errors, values } = await validateAllfieds()
        if (isValid && onFinsh) {
            onFinsh(values)
        } else if (!isValid && onFinshFailed) {
            onFinshFailed(values, errors)
        }
    }

    let childrenNode: ReactNode
    if (typeof children === 'function') {
        childrenNode = children(form)
    } else {
        childrenNode = children
    }
    return (
        <form name={name} className='form' onSubmit={submitForm} >
            <FormContext.Provider value={passContext}>
                {childrenNode}
            </FormContext.Provider>
        </form>
    )
})
Form.defaultProps = {
    name: 'form'
}
export default Form