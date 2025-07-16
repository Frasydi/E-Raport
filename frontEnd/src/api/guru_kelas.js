import axiosInstance from "./axiosInstance";

export const getGuruKelas = async () => {
    try {
        const res = await axiosInstance.get("/guru");
        return res.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const postDataGuru = async (data) => {
    try {
        const res = await axiosInstance.post("/guru/tambah-data-guru", data);
        return res;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateDataGuru = async (id_guru, data) => {
    try {
        const res = await axiosInstance.patch(
            `/guru/update-data-guru/${id_guru}`,
            data
        );
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const deleteData = async (id_guru) => {
    try {
        const res = await axiosInstance.delete(
            `/guru/delete-data-guru/${id_guru}`
        );
        return res;
    } catch (error) {
        throw error.response.data;
    }
};

export const searchDataGuru = async (keyword) => {
    try {
        const response = await axiosInstance.get(
            `/guru/searchData/${keyword}`
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
