import React, { createContext, useState, ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
export type MenuType = "horizontal" | "vertical"
/** 点击子菜单触发的回调 */
type handleSelect = (selectIndex: string) => void
type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: CSSProperties;
    /**点击菜单项触发的回掉函数 */
    onSelect?: (selectedIndex: string) => void;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[]; //用来设置下拉菜单是否默认展开，以及展开哪些，因为 index 是string，所以此处用string[]
    children?: ReactNode;
}
interface IMenuContext {
    index: string;
    onSelect?: handleSelect;
    type?: MenuType;
    defaultOpenSubMenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })
export const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus,
    } = props;
    const [active, setActive] = useState<string>(defaultIndex as string)

    const classes = classNames('menu', className, {
        [`menu-vertical`]: mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',

    })
    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }
    const passContext: IMenuContext = {
        index: active ? active : '0',
        onSelect: handleClick,
        type: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const displayName = childElement.type.name

            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement
                    (childElement, {
                        index: index.toString()
                    })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passContext}>
                {/* 
                子组件需要参数： 
                    当前 active ，设置高亮；
                    onSelect回调函数，点击子组件会触发
                */}
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu