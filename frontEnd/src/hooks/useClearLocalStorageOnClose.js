import { useEffect } from "react";

export function useClearLocalStorageOnClose(keepKeys = []) {
    useEffect(() => {
        const sessionKey = "tabStillActive";

        // Tandai bahwa session masih aktif
        sessionStorage.setItem(sessionKey, "true");

        const handleBeforeUnload = () => {
            // Jika session key sudah tidak ada, berarti tab baru (atau sudah ditutup sebelumnya)
            const isReload = sessionStorage.getItem(sessionKey) !== null;

            if (!isReload) return;

            // Saat reload, biarkan data tetap
            // Saat close tab (setelah unload selesai), sessionStorage akan hilang otomatis
            // Tapi kita bisa pakai `visibilitychange` untuk eksekusi sebelum itu

            // Tidak perlu hapus apa-apa di sini
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                // Eksekusi hanya jika tab benar-benar akan ditutup (bukan reload)
                const isReload = sessionStorage.getItem(sessionKey) !== null;
                if (!isReload) return;

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
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [keepKeys]);
}
