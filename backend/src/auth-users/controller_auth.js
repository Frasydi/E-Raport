const router = require("express").Router();
const { Login, refreshToken, Logout } = require("./services_auth");

router.post("/auth/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const { success, msg, accessToken, refreshToken } = await Login(
            username,
            password,
            req.headers["user-agent"]
        );
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success, msg, accessToken });
    } catch (error) {
        next(error);
    }
});

router.get("/auth/token", async (req, res, next) => {
    const getToken = req.cookies.refresh_token;
    try {
        const { success, msg, token } = await refreshToken(getToken);
        res.status(200).json({ success, msg, token });
    } catch (error) {
        next(error);
    }
});

router.post("/auth/logout", async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        await Logout(refreshToken);
        res.clearCookie("refresh_token", {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({
            status: "success",
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
