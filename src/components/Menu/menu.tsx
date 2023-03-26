import React, { createContext, useState } from 'react'
import classNames from 'classnames'

export type MenuType = "horizontal" | "vertical"
/** 点击子菜单触发的回调 */
type handleSelect = (selectIndex: number) => void
export interface MenuProps {
    /** 默认 active 的菜单项索引值  */
    defaultIndex?: number,
    className?: string,
    /** 菜单类型：纵向 / 横向 */
    mode?: MenuType,
    children?: React.ReactNode,
    style?: React.CSSProperties,
    /** 点击菜单项触发的回调函数 */
    onSelect?: handleSelect
}
interface IMenuContext {
    index: number,
    onSelect?: handleSelect,
}
export const MenuContext = createContext<IMenuContext>({ index: 0 })
export const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        ...restProps
    } = props;
    const [active, setActive] = useState<number>(defaultIndex as number)

    const classes = classNames('menu', className, {
        [`menu-vertical`]: mode === 'vertical'
    })
    const handleClick = (index:number)=>{
        setActive(index);
        if(onSelect){
            onSelect(index)
        }
    }
    const passContext: IMenuContext = {
        index: active ? active : 0,
        onSelect: handleClick,

    }
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={ passContext}>
                {/* 
                子组件需要参数： 
                    当前 active ，设置高亮；
                    onSelect回调函数，点击子组件会触发
                */}
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu