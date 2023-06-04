//*定制化过渡效果，根据传参来返回相应的动画效果
import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom'

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        wrapper,
        ...restProps
    } = props
    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {wrapper ? <div>{children as ReactNode}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}


export default Transition