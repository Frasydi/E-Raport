import axiosInstance from "./axiosInstance";

export const updateKesimpulan = async (id_rekap_nilai, data) => {
    try {
        const res = await axiosInstance.patch(
            `/kesimpulan/update-kesimpulan/${id_rekap_nilai}`,
            data
        );
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const getKesimpulan = async (id_rekap_nilai) => {
    try {
        const res = await axiosInstance.get(`/kesimpulan/${id_rekap_nilai}`);
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};
