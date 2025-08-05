const router = require("express").Router();

const {headerProfilSekolah, displayByTahunAjaran} = require("./services_amount")

router.get("/jml-peserta-didik", async (req, res, next) => {
    try {
        const response = await headerProfilSekolah()
        res.json({
            success: true,
            msg: "data berhasil didapatkan",
            data: response,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/display-by-tahun/:id_tahun_ajaran", async(req,res,next)=> {
    const {id_tahun_ajaran} = req.params
    try {
        const response = await displayByTahunAjaran(id_tahun_ajaran)
        res.json({
            success: true,
            msg:"data berhasil didapatkan",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

module.exports  = router