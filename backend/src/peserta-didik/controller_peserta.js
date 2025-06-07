const {ambiluser} = require('./services_peserta')
const router = require("express").Router();
router.get('/user', async(req, res,next) => {
    const user = await ambiluser()
    res.json(user)

})

module.exports = router
