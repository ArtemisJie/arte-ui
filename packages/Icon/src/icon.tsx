import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
    /** 支持框架主题 根据主题显示不同的颜色 */
    theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {

    const {
        theme,
        ...restProps
    } = props

    const classes = classNames("icon", {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon