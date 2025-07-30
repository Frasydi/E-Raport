import axiosInstance from "./axiosInstance";

export const getDataProfil = async () => {
    try {
        const res = await axiosInstance.get("/profil-sekolah");
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateDataProfil = async (data) => {
    try {
        const res = await axiosInstance.patch(
            "/profil-sekolah/update-data",
            data
        );
        return res;
    } catch (error) {
        throw error.response.data;
    }
};
