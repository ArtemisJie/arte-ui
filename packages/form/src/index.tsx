import { FC } from 'react'
import Form from './form'
import Item, { FormItemProps } from './formItem'
import '../styles/index.scss'

export type FormComponent = typeof Form & {
    Item: FC<FormItemProps>
}
const TransForm: FormComponent = Form as FormComponent
TransForm.Item = Item

export default TransForm;