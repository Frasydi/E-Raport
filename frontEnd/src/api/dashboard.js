import axiosInstance from "./axiosInstance";

export const getJmlPesertaDidik = async () => {
    try {
        const res = await axiosInstance.get("/amount/jml-peserta-didik");
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const getByTahunAjaran = async (id_tahun_ajaran) => {
    try {
        const res = await axiosInstance.get(`/amount/display-by-tahun/${id_tahun_ajaran}`);
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

