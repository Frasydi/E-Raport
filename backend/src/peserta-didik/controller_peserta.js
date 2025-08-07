const router = require("express").Router();
const {
    addDataPesertaDidik,
    displayDataPesertaDidik,
    displayByTahunAjaran,
    updateData,
    deleteDataPeserta,
} = require("./services_peserta");
const { searchPesertaDidik, allPesertaDidik } = require("./repository_peserta");

const { finByTahunSemester } = require("./repository_peserta");
router.post("/tambah-peserta-didik", async (req, res, next) => {
    try {
        await addDataPesertaDidik(req.body);
        res.json({
            success: true,
            msg: "data siswa berhasil ditambahkan",
        });
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const response = await displayDataPesertaDidik();
        res.json(response);
    } catch (error) {
        next(error);
    }
});

// mengambil data peserta didik dari req.query id_tahun_ajaran & semester
router.get("/penilaian", async (req, res, next) => {
    const { tahunAjaranId, semester } = req.query;
    try {
        const response = await finByTahunSemester(tahunAjaranId, semester);
        res.json({
            data: response,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/search/:keyword", async (req, res, next) => {
    const { keyword } = req.params;
    try {
        const response = await searchPesertaDidik(keyword)
        const peserta_didik = response.map((item)=> {
            return {
                guru: item.guru,
                peserta_didik: item.pesertaDidik,
                tahun_ajaran: item.tahunAjaran
            }
        })
        res.json({
            success: true,
            message: 'data didapatkan',
            response: peserta_didik
        })
    } catch (error) {
        next(error)
    }
});

router.get("/searchData/:keyword", async(req,res,next)=> {
    const {keyword} = req.params
    try {
        const response = await allPesertaDidik(keyword)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await displayByTahunAjaran(id);
        const data = response.map((val) => {
            return {
                peserta_didik: val.pesertaDidik,
                tahun_ajaran: val.tahunAjaran,
                guru: val.guru,
            };
        });
        res.json({
            success: true,
            message: "data berhasil didapatkan",
            data,
        });
    } catch (error) {
        next(error);
    }
});

router.patch(
    "/update-peserta-didik/:id/:id_tahun_ajaran",
    async (req, res, next) => {
        try {
            await updateData(
                req.body,
                req.params.id,
                req.params.id_tahun_ajaran
            );
            res.json({
                success: true,
                msg: "data berhasil di update",
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/delete-data-peserta-didik/:id_peserta_didik/:id_tahun_ajaran", async (req, res, next) => {
    try {
        await deleteDataPeserta(req.params.id_peserta_didik, req.params.id_tahun_ajaran);
        res.json({
            success: true,
            msg: "data berhasil di hapus",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
