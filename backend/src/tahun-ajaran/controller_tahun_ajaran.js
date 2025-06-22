const router = require("express").Router();
const {
    displayTahun,
    addDataTahun,
    removeTahun,
} = require("./services_tahun_ajaran");

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

module.exports = router;
