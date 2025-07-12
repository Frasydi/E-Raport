import { useRef } from "react";
import { useCallback } from 'react'
export const useFocusError = () => {
    const errorRef = useRef(null);
    const focusError = useCallback(() => {
        errorRef.current?.focus?.();
    }, []);
    return { errorRef, focusError };
};
