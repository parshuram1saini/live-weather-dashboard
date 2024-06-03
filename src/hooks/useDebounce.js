import { useRef, useCallback } from 'react';

function useDebounce(fn, delay = 800) {
    const timer = useRef(null);

    const debouncedFunction = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            fn(...args);
        }, delay);
    }, [fn, delay]);

    return debouncedFunction;
}

export default useDebounce;
