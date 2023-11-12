import classNames from 'classnames'
import React from 'react'
//button size
export type ButtonSize = 'lg' | 'sm';
//button type
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
//button props
interface BaseButtonProps {
    /** 设置按钮的类名 */
    className?: string;
    /** 设置按钮禁用属性 */
    disabled?: boolean;
    /** 设置按钮的大小 */
    size?: ButtonSize;
    /** 设置按钮的类型 */
    btnType?: ButtonType;
    /** 设置按钮的子节点 */
    children: React.ReactNode;
    /** 设置链接按钮的链接 */
    href?: string;
}
/* 
    用交叉属性，把所有属性结合起来，用以补充我们Button组件的属性
*/
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps //用扩展运算符把剩余其他属性也传进来
    } = props

    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })

    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    btnType: 'default',
    disabled: false
}
export default Button;