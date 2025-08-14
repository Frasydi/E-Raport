import { create } from "zustand";
import { getTahunAjaran, deleteTahunAjaran } from "../api/tahun_ajaran";

export const useTahunAjaranStore = create((set) => ({
    tahun_ajaran: null,
    loading: false,
    error: null,
    emptyData:"",

    fetchData: async () => {
        set({ loading: true, error: null });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await getTahunAjaran();
            set({
                emptyData:"",
                tahun_ajaran: response.data,
                loading: false,
            });
            return response.data;
        } catch (error) {
            set({
                emptyData:"HALO CUYYY",
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
                error: "Penghapusan dibatalkan: masih ada peserta didik yang terdaftar pada tahun ajaran ini.",
            });
            throw error
        } finally {
            set({ loading: false });
        }
    },
}));
