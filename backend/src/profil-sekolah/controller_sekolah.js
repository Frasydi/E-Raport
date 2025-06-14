const router = require("express").Router();
const { displayDataSchool, updateDataSchool } = require("./services_sekolah");

router.get("/", async (req, res, next) => {
    try {
        const data = await displayDataSchool();

        res.status(200).json({
            success: true,
            msg: "data berhasil didapatkan",
            data,
        });
    } catch (error) {
        next(error);
    }
});

router.patch("/update-data", async (req, res, next) => {
    try {
        const update = await updateDataSchool(req.body);
        res.status(200).json(update);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
