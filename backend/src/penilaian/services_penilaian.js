const {
    finByTahunSemester,
    createPenilaian,
    getDataKategori,
    getDataSubkategori,
    getIndikator,
    updatePenilaian,
    existing,
    penilaianList,
} = require("./repository_penilaian");
const { validatorField, sanitizeData } = require("../utils/validator");
const { validateUpdatePayload } = require("../utils/validator");
const throwWithStatus = require("../utils/throwWithStatus");

const displayPesertaDidikByTahunSemester = async (tahunAjaran, semester) => {
    validatorField({ tahunAjaran, semester });
    try {
        const response = await finByTahunSemester(tahunAjaran, semester);
        if (!response || response.length == 0) {
            throwWithStatus("data peserta pada tahun ini belum ada", 404);
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
        validatorField({ id_rekap_nilai });

        const response = await getDataKategori(id_rekap_nilai);
        if (!response || response.length === 0) {
            throwWithStatus("kesalahan server", 500);
        }

        const kategoriMap = new Map();

        for (const item of response) {
            const kategori = item.indikator.subKategori.kategori;
            const pesertaDidik = item.rekapNilai.pesertaDidik;
            const tahunAjaran = item.rekapNilai.tahunAjaran;
            const semester = item.rekapNilai.semester;

            if (!kategoriMap.has(kategori.id_kategori)) {
                kategoriMap.set(kategori.id_kategori, {
                    id_kategori: kategori.id_kategori,
                    nama_kategori: kategori.nama_kategori,
                    peserta_didik: {
                        nama_lengkap: pesertaDidik.nama_lengkap,
                        nis: pesertaDidik.nis,
                        tahunAjaran: tahunAjaran.tahun_ajaran,
                        semester: semester.nama,
                    },
                });
            }
        }

        return Array.from(kategoriMap.values());
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
        const response = await getIndikator(
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

        const newData = [];
        const existingData = [];

        for (const item of nilai_list) {
            const sanitizedItem = sanitizeData(item);

            // Validasi nilai hanya B, C, P, atau null
            if (
                sanitizedItem.nilai !== null &&
                !validEnum.includes(sanitizedItem.nilai)
            ) {
                throwWithStatus(
                    `Nilai tidak valid: ${sanitizedItem.nilai}. Harus B, C, P, atau kosong.`,
                    400
                );
            }

            const id_penilaian = penilaianMap.get(sanitizedItem.id_indikator);
            if (!id_penilaian) continue;

            const existingRecord =  await existing(id_penilaian);

            const existingFlat =
                Array.isArray(existingRecord) && existingRecord.length === 1
                    ? existingRecord[0]
                    : existingRecord;

            if (!existingFlat) continue;

            const newItem = {
                id_penilaian,
                nilai: sanitizedItem.nilai,
            };

            newData.push(newItem);
            existingData.push(existingFlat);
        }

        // ✅ Validasi: apakah ada perubahan nilai?
        validateUpdatePayload(newData, existingData);

        // ✅ Eksekusi update jika ada perubahan
        const results = [];
        for (const item of newData) {
            const updated = await updatePenilaian(
                item.nilai,
                item.id_penilaian
            );
            results.push(updated);
        }

        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    displayPesertaDidikByTahunSemester,
    postPenilaian,
    displayKategori,
    displaySubKategori,
    displayIndikator,
    updateNilai,
};
