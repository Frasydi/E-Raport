import axiosInstance from "./axiosInstance"

export const getDataProfil = async() => {
    const res = await axiosInstance.get("/profil-sekolah")
    return res.data
}

export const updateDataProfil = async(data)=> {
    try {
        const res = await axiosInstance.patch("/profil-sekolah/update-data", data)
        return res
    } catch (error) {
        throw error.response.data     
    }
}