const {
    finByTahunSemester,
    createPenilaian,
    getDataKategori,
    getDataSubkategori,
    getIndikator,
    updatePenilaian,
    penilaianList,
} = require("./repository_penilaian");
const { validatorField } = require("../utils/validator");
const throwWithStatus = require("../utils/throwWithStatus");

const displayPesertaDidikByTahunSemester = async (tahunAjaran, semester) => {
    validatorField({ tahunAjaran, semester });
    try {
        const response = await finByTahunSemester(tahunAjaran, semester);
        if (!response || response.length == 0) {
            throwWithStatus("data belum ada", 404);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

const postPenilaian = async (id_rekap_nilai) => {
    try {
        validatorField({
            id_rekap_nilai,
        });
        const response = await createPenilaian(id_rekap_nilai);
        if (!response || response.length == 0) {
            throwWithStatus("kesalahan server", 500);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

const displayKategori = async (id_rekap_nilai) => {
    try {
        validatorField({
            id_rekap_nilai,
        });
        const response = await getDataKategori(id_rekap_nilai);
        if (!response || response.length == 0) {
            throwWithStatus("kesalahan server", 500);
        }
        const kategoriList = response.map(
            (p) => p.indikator.subKategori.kategori
        );
        const uniqueKategori = [
            ...new Map(kategoriList.map((k) => [k.id_kategori, k])).values(),
        ];
        return uniqueKategori;
    } catch (error) {
        throw error;
    }
};

const displaySubKategori = async (id_rekap_nilai, id_kategori) => {
    try {
        validatorField({
            id_kategori,
            id_rekap_nilai,
        });
        const response = await getDataSubkategori(id_rekap_nilai, id_kategori);
        if (!response || response.length == 0) {
            throwWithStatus("kesalahan server", 500);
        }
        const subKategori = [
            ...new Map(
                response.map((item) => [item.id_sub_kategori, item])
            ).values(),
        ];
        return subKategori;
    } catch (error) {
        throw error;
    }
};

const displayIndikator = async (
    id_rekap_nilai,
    id_kategori,
    id_sub_kategori
) => {
    try {
        validatorField({
            id_rekap_nilai,
            id_kategori,
            id_sub_kategori,
        });
        const response = getIndikator(
            id_rekap_nilai,
            id_kategori,
            id_sub_kategori
        );
        if (!response || response.length == 0) {
            throwWithStatus("kesalahan server", 500);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

const updateNilai = async (id_rekap_nilai, id_sub_kategori, nilai_list) => {
    if (!Array.isArray(nilai_list)) {
        throwWithStatus("invalid payload", 400);
    }
    const validEnum = ["B", "C", "P"];
    try {
        const listPenilaian = await penilaianList(
            id_rekap_nilai,
            id_sub_kategori
        );
        const penilaianMap = new Map();
        listPenilaian.forEach((p) =>
            penilaianMap.set(p.indikatorId, p.id_penilaian)
        );
        const results = [];
        for (const item of nilai_list) {
            if (item.nilai !== null && !validEnum.includes(item.nilai)) {
                throwWithStatus(
                    `Nilai tidak valid: ${item.nilai}. Harus B, C, P, atau null.`,
                    400
                );
            }

            const id_penilaian = penilaianMap.get(item.id_indikator);
            if (!id_penilaian) continue;

            const update = await updatePenilaian(item.nilai, id_penilaian)
            results.push(update);
        }

        return results
    } catch (error) {
        console.log(error)
        throw error
    }
};

module.exports = {
    displayPesertaDidikByTahunSemester,
    postPenilaian,
    displayKategori,
    displaySubKategori,
    displayIndikator,
    updateNilai
};
