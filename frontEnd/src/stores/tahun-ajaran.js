import { create } from "zustand";
import { getTahunAjaran, deleteTahunAjaran } from "../api/tahun_ajaran";

export const useTahunAjaranStore = create((set) => ({
    tahun_ajaran: null,
    loading: false,
    error: null,

    fetchData: async () => {
        set({ loading: true, error: null });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await getTahunAjaran();
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
            set({ loading: false });
        }
    },

    deleteData: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteTahunAjaran(id);
            set((state) => ({
                tahun_ajaran: (state.tahun_ajaran || []).filter(
                    (t) => t.id_tahun_ajaran !== id
                ),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.message || "Gagal menghapus tahun ajaran",
            });
        } finally {
            set({ loading: false });
        }
    },
}));
