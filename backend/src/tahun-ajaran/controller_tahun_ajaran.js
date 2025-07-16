const router = require("express").Router();
const {
    displayTahun,
    addDataTahun,
    removeTahun,
    updateTahunAjaran,
} = require("./services_tahun_ajaran");

const { searchDataTahun } = require("./repository_tahun_ajaran");

router.get("/", async (req, res, next) => {
    try {
        const data = await displayTahun();
        res.json({
            success: true,
            msg: "data berhasil didapatkan",
            data,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/searchData/:keyword", async(req,res,next)=> {
    try {
        const {keyword} = req.params
        const response = await searchDataTahun(keyword)
        res.json({
            success:true,
            data: response
        })
    } catch (error) {
        next(error)
    }
})

router.post("/tambah-tahun-ajaran", async (req, res, next) => {
    try {
        await addDataTahun(req.body);
        res.json({
            success: true,
            msg: "data berhasil di tambahkan",
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/hapus-tahun-ajaran/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await removeTahun(id);
        res.json({
            success: true,
            msg: "data berhasil dihapus",
        });
    } catch (error) {
        next(error);
    }
});

router.patch("/update-tahun-ajaran/:id", async (req, res, next) => {
    try {
        await updateTahunAjaran(req.body, req.params.id);
        res.json({
            success: true,
            message: "data berhasil di update",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
