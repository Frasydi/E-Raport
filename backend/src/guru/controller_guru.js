const router = require("express").Router()
const {displayDataGuru, AddDataGuru, updateData, deleteDataGuru} = require("./services_guru")

router.get("/", async(req,res, next)=> {
    try {
        const data = await displayDataGuru()
        res.status(200).json({
            success:true,
            msg: "data berhasil didapatkan",
            data
        })
    } catch (error) {
        next(error)
    }
})

router.post("/tambah-data-guru", async (req,res, next)=> {
    try {
        await AddDataGuru(req.body)
        res.json({
            success: true,
            msg: "data berhasil di tambahkan"
        })
    } catch (error) {
        next(error)
    }
})


router.patch("/update-data-guru/:id", async(req,res,next)=> {
    const {id} = req.params;
    try {
        await updateData(req.body, id)
        res.json({
            success: true,
            msg: "data berhasil di update"
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/delete-data-guru/:id_guru", async(req, res, next)=> {
    try {
        await deleteDataGuru(req.params.id_guru)
        res.json({
            success: true,
            msg: "data berhasil di hapus"
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router