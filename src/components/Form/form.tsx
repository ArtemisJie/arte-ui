import React, { FC, ReactNode, createContext } from "react";
import useStore from "./useStore";
import { ValidateError } from 'async-validator'
export interface FormProps {
    name?: string; //form的名称
    initialValues?: Record<string, any>;//{[key:string]:any}
    children?: ReactNode;
    onFinsh?: (values: Record<string, any>) => void;
    onFinshFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fileds' | 'validateFiled'> //利用ReturnType获取一个函数返回的的所有类型，再利用Pick获取某一个的类型
    & Pick<FormProps, 'initialValues'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = (props) => {
    const {
        name,
        children,
        onFinsh,
        onFinshFailed,
        ...restProps
    } = props;
    //validateFiled是用来验证的
    const { form, fileds, dispatch, validateFiled, validateAllfieds } = useStore()
    const passContext: IFormContext = {
        dispatch,
        fileds,
        // @ts-ignore
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
    return (
        <form name={name} className='form' onSubmit={submitForm}>
            <FormContext.Provider value={passContext}>
                {children}
            </FormContext.Provider>
        </form>
    )
}
Form.defaultProps = {
    name: 'form'
}
export default Form