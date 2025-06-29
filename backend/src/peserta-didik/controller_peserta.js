const router = require("express").Router();
const {
    addDataPesertaDidik,
    displayDataPesertaDidik,
    displayByTahunAjaran,
    updateData,
    deleteDataPeserta
} = require("./services_peserta");

const {finByTahunSemester} = require('./repository_peserta')
router.post("/tambah-peserta-didik", async (req, res, next) => {
    try {
        await addDataPesertaDidik(req.body);
        res.json({
            success: true,
            msg: "data siswa berhasil ditambahkan",
        });
    } catch (error) {
        console.log(error)
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
router.get("/penilaian", async(req,res, next)=> {
    const {tahunAjaranId, semester} = req.query
    try {
        const response = await finByTahunSemester(tahunAjaranId, semester)
        res.json({
            data: response
        })
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await displayByTahunAjaran(id);
        const data = response.map((val) => val.pesertaDidik);
        res.json({
            data,
        });
    } catch (error) {
        next(error);
    }
});



router.patch("/update-peserta-didik/:id", async(req,res,next)=> {
    try {
        await updateData(req.body, req.params.id)
        res.json({
            success: true,
            msg: 'data berhasil di update'
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/delete-data-peserta-didik/:id", async(req, res, next)=> {
    try {
        await deleteDataPeserta(req.params.id)
        res.json({
            success: true,
            msg: "data berhasil di hapus"
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router;
