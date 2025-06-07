const router = require("express").Router();
const { Login, refreshToken } = require("./services_auth");

router.post("/auth/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const { success, msg, accessToken, refreshToken } = await Login(
            username,
            password
        );
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success,
            msg,
            accessToken,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/auth/token", async (req, res) => {
    const getToken = req.cookies.refresh_token;
    try {
        const { success, msg, token } = await refreshToken(getToken);
        res.status(200).json({
            success,
            msg,
            token,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
