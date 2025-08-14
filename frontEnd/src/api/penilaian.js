import axiosInstance from "./axiosInstance";
export const getByTahunSemester = async (id, semester, nama_kelas) => {
    try {
        const response = await axiosInstance.get("/penilaian", {
            params: {
                tahunAjaranId: id,
                semester: semester,
                nama_kelas: nama_kelas
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

export const getPenilaian = async (id_tahun_ajaran, semester, nama_kelas) => {
    try {
        const response = await axiosInstance.get(
            `/penilaian/display-penilaian/${id_tahun_ajaran}/${semester}`, {
                params: {
                    nama_kelas: nama_kelas
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.message;
        } else {
            throw error;
        }
    }
};

export const searhPenilaian = async (id_tahun_ajaran, semester, keyword) => {
    try {
        const response = await axiosInstance.get(
            `/penilaian/search-penilaian/${id_tahun_ajaran}/${semester}`,
            {
                params: { keyword },
            }
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

export const searchRaport = async (id_tahun_ajaran, semester, keyword) => {
    try {
        const response = await axiosInstance.get("/penilaian/search-raport", {
            params: {
                id_tahun_ajaran,
                semester,
                keyword,
            },
        });
        return response.data?.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.message || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};
