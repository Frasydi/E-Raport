import { create } from "zustand";
import { getGuruKelas } from "../api/guru_kelas";

export const useGuruStore = create((set) => ({
    data: [],
    loading: false,
    error: null,

    fetchGuruKelas: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await getGuruKelas();
            set({ data: response, loading: false });
        } catch (error) {
            set({
                error: error.message || "Gagal mengambil data peserta didik",
                loading: false,
            });
            throw error;
        }
    },
    reset: () => set({ data: [], loading: false, error: null }),
}));
