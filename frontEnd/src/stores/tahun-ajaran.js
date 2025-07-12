import { create } from "zustand";
import { getDataTahunAjaran } from "../api/peserta_didik";

export const useTahunAjaranStore = create((set) => ({
    tahun_ajaran: null,
    loading: false,
    error: null,

    fetchData: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getDataTahunAjaran();
            set({
                tahun_ajaran: response.data,
                loading: false,
            });
            return response.data;
        } catch (error) {
            set({
                error: error.message || "Gagal mengambil data tahun ajaran",
            });
            throw error;
        } finally {
            set({loading:false})
        }
    },
}));
