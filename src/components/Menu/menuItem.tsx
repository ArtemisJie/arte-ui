import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
export interface MenuItemProps {
    index: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        index,
        disabled,
        className,
        style,
        children,
        ...restProps
    } = props;

    const context = useContext(MenuContext) //context有了之后，就可以知道哪个子选项应该高亮

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {

        if (context.onSelect && !disabled ) {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default MenuItem