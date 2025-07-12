import { create } from "zustand";
import {
    getDatabyTahunAjaran,
    searchPesertaDidik,
    deletePesertaDidik,
    getSearchPesertaDidik
} from "../api/peserta_didik";

export const usePesertaDidikStore = create((set) => ({
    data: [],
    loading: false,
    error: null,

    fetchByTahunAjaran: async (id) => {
        set({ loading: true, error: null, data: [] });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await getDatabyTahunAjaran(id);
            set({ data: response });
        } catch (error) {
            set({
                error: error.message || "Gagal mengambil data peserta didik",
            });
        } finally {
            set({ loading: false });
        }
    },

    searchPeserta: async (keyword) => {
        set({ loading: true, error: null, data: [] });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const hasil = await searchPesertaDidik(keyword);
            set({ data: hasil.response });
        } catch (error) {
            set({
                error: error.message || "Gagal mengambil data peserta didik",
            });
        } finally {
            set({ loading: false });
        }
    },

    searchPesertaDidik: async (keyword) => {
        set({ loading: true, error: null, data: [] });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const hasil = await getSearchPesertaDidik(keyword);
            console.log(hasil)
            set({ data: hasil });
        } catch (error) {
            set({
                error: error.message || "Gagal mengambil data peserta didik",
            });
        } finally {
            set({ loading: false });
        }
    },

    deletePeserta: async (id_peserta_didik, id_tahun_ajaran) => {
        set({ loading: true, error: null });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await deletePesertaDidik(id_peserta_didik, id_tahun_ajaran);
            const response = await getDatabyTahunAjaran(id_tahun_ajaran);
            set({ data: response });
        } catch (error) {
            set({
                error: error.message || "gagal mengahapus data pesertaDidik",
            });
        } finally {
            set({ loading: false });
        }
    },
    reset: () => set({ data: [], loading: false, error: null }),
}));
