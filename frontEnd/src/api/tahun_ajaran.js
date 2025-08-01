import axiosInstance from "./axiosInstance";

export const getTahunAjaran = async () => {
    try {
        const res = await axiosInstance.get("/tahun-ajaran");
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data?.message || "Terjadi kesalahan");
        } else {
            throw error;
        }
    }
};

export const insertTahunAjaran = async (data) => {
    try {
        const response = await axiosInstance.post(
            "/tahun-ajaran/tambah-tahun-ajaran",
            data
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data || "Terjadi kesalahan";
        } else {
            throw error;
        }
    }
};

export const deleteTahunAjaran = async (id) => {
    try {
        const response = await axiosInstance.delete(
            `tahun-ajaran/hapus-tahun-ajaran/${id}`
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

export const updateTahunAjaran = async (data, id) => {
    try {
        const response = await axiosInstance.patch(
            `tahun-ajaran/update-tahun-ajaran/${id}`,
            data
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

export const searchDataTahun = async (keyword) => {
    try {
        const response = await axiosInstance.get(
            `/tahun-ajaran/searchData/${keyword}`
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
