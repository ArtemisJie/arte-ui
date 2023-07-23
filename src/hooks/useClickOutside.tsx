import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    //监听当前鼠标点击的元素是否是列表里的，若不是就把列表收起
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            handler(event)
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, handler])
}

export default useClickOutside