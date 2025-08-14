import axiosInstance from "./axiosInstance";

export const getDataTahunAjaran = async () => {
    try {
        const response = await axiosInstance.get("tahun-ajaran");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getDatabyTahunAjaran = async (id_tahun_ajaran, nama_kelas) => {
    try {
        const response = await axiosInstance.get(
            `peserta-didik/${id_tahun_ajaran}`, 
            {
                params: {
                    nama_kelas
                }
            }
        );
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const insertPesertaDidik = async (id_tahun_ajaran, id_guru, data) => {
    try {
        const response = await axiosInstance.post(
            "peserta-didik/tambah-peserta-didik",
            {
                tahunAjaranId: id_tahun_ajaran,
                guruId: id_guru,
                pesertaDidik: data,
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updatePesertaDidik = async (id, id_tahun_ajaran, data) => {
    try {
        const response = await axiosInstance.patch(
            `peserta-didik/update-peserta-didik/${id}/${id_tahun_ajaran}`,
            data
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const searchPesertaDidik = async (keyword) => {
    try {
        const response = await axiosInstance.get(
            `peserta-didik/search/${keyword}`
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deletePesertaDidik = async (id_peserta_didik, id_tahun_ajaran) => {
    try {
        const response = await axiosInstance.delete(
            `peserta-didik/delete-data-peserta-didik/${id_peserta_didik}/${id_tahun_ajaran}`
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getPesertaDidik = async () => {
    try {
        const response = await axiosInstance.get("/peserta-didik");
        return response.data
    } catch (error) {
        throw error.response.data;
    }
};

export const getSearchPesertaDidik = async (data) => {
    try {
        const response = await axiosInstance.get(`/peserta-didik/searchData/${data}`);
        return response.data
    } catch (error) {
        throw error.response.data;
    }
};

