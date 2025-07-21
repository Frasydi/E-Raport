import axiosInstance from "./axiosInstance";
export const getByTahunSemester = async (id, semester) => {
    try {
        const response = await axiosInstance.get("/penilaian", {
            params: {
                tahunAjaranId: id,
                semester: semester,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.message || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const getKategori = async (id_rekap_nilai) => {
    try {
        const response = await axiosInstance.get(
            `/penilaian/${id_rekap_nilai}`
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.message || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const getSubKategori = async (id_rekap_nilai, id_kategori) => {
    try {
        const response = await axiosInstance.get(
            `/penilaian/${id_rekap_nilai}/${id_kategori}`
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.message || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const getIndikator = async (
    id_rekap_nilai,
    id_kategori,
    id_sub_kategori
) => {
    try {
        const response = await axiosInstance.get(
            `/penilaian/${id_rekap_nilai}/${id_kategori}/${id_sub_kategori}`
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.message || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const updatePenilaian = async (
    id_rekap_nilai,
    id_sub_kategori,
    nilai_list
) => {
    try {
        const response = await axiosInstance.patch(
            `/penilaian/update-nilai/${id_rekap_nilai}/${id_sub_kategori}`,
            nilai_list
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.message || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};
