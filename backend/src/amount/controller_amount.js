const router = require("express").Router();

const { getJumlahPesertaDidik, getJumlahPria, getJumlahWanita } = require("./repository_amount");

router.get("/jml-peserta-didik", async (req, res, next) => {
    try {
        const response = await getJumlahPesertaDidik();
        res.json({
            success: true,
            msg: "data berhasil didapatkan",
            data: response,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/jml-pria", async (req, res, next) => {
    try {
        const response = await getJumlahPria();
        res.json({
            success: true,
            msg: "data berhasil didapatkan",
            data: response,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/jml-wanita", async (req, res, next) => {
    try {
        const response = await getJumlahWanita();
        res.json({
            success: true,
            msg: "data berhasil didapatkan",
            data: response,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
