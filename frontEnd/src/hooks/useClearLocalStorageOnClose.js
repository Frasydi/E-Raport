import { useEffect } from "react";

export function useClearLocalStorageOnClose(keepKeys = []) {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                try {
                    const allKeys = Object.keys(localStorage);
                    const keysToRemove = allKeys.filter(
                        (key) => !keepKeys.includes(key)
                    );
                    keysToRemove.forEach((key) => localStorage.removeItem(key));
                } catch (err) {
                    console.error("Error clearing localStorage:", err);
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [keepKeys]);
}
