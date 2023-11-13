import { useState, useEffect } from 'react'

function useDebounce(value: unknown, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debouncedValue
}

export default useDebounce;