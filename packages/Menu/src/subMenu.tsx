import React, { createContext, useState, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext, MenuType } from './menu'
import { MenuItemProps } from './menuItem';
import { CSSTransition } from 'react-transition-group';
import Icon from '@arte-ui/icon';
import Transition from '../../Transition/src/transition';

export interface subMenuProps {
    index?: string;
    title?: string;
    className?: string;
    children?: React.ReactNode
}

const SubMenu: React.FC<subMenuProps> = (props) => {
    const {
        index,
        title,
        className,
        children,
        ...restprops
    } = props;

    const context = useContext(MenuContext);
    const openSubMenus = context.defaultOpenSubMenus as Array<string> //*我们需要类型断言，思考为什么

    const isOpend = (index && context.type === 'vertical') ? openSubMenus.includes(index) : false //*我们把默认的展开下拉子菜单的index获取之后，判断是否包含当前渲染的下拉子菜单，若包含则展示，并且只有是垂直的时候才需要展示
    const [open, setOpen] = useState(isOpend); //*用来表示是否显示子菜单
    console.log(open);

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opend': open,
        'is-vertical': context.type === 'vertical'
    })
    //*点击事件：点击之后与上一个状态相反
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!open)
    }

    //*为了使关闭子菜单更加平滑，使用一个定时
    let timer: any;
    //*显示子菜单的通用函数
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer); //每次都先清除上一个定时器
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle) //设置显示状态
        }, 100)
    }

    const clickEvents = context.type === 'vertical' ? {
        onClick: handleClick //如果上级菜单是垂直式的，那么就有点击事件，否则的话就没有
    } : {}

    const hoverEvents = context.type !== 'vertical' ? { //如果是水平菜单的话，则进行下列操作

        onMouseOver: (e: React.MouseEvent) => { handleMouse(e, true) }, //如果鼠标进入的话，就显示子菜单
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) } //如果鼠标移开的话。就不显示子菜单
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', {
            'menu-opened': open
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const displayName = childElement.type.name
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, { //*为什么这里要用cloneElement
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: subMenu has a child which is not a MenuItem');

            }
        })

        return (
            <Transition
                in={open}
                timeout={300}
                animation='zoom-in-top'
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>

            <div className='submenu-title' {...clickEvents}>
                {title}
                <Icon icon='angle-down' className='arrow-icon' />
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu