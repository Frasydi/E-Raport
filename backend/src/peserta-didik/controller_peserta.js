//const {ambiluser} = require('./services_peserta')
const router = require("express").Router();
//router.get('/user', async(req, res,next) => {
//    const user = await ambiluser()
//    res.json(user)

//})
router.get("/user", (req, res) => {
    // Data user sudah tersedia di req.user
    res.json({
        email: req.user.username,
        userId: req.user.id,
    });
});

module.exports = router;
