const { findUsername, updateToken, findToken } = require("./repository_auth");
const throwWithStatus = require("../utils/throwWithStatus");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verifyToken = promisify(jwt.verify);

// -- Login dengan jwt
const Login = async (username, password) => {
    // -- ketika username dan password tidak di ada input
    if (!username || !password) {
        throwWithStatus("form login masih kosong", 400);
    }

    const user = await findUsername(username);

    if (user.password != password) {
        throwWithStatus("username atau kata sandi salah", 400);
    }
    // -- ketika username dan password tidak cocok di database
    const usernameUser = user.username;
    const id = user.id;

    // -- membuat akses token
    const accessToken = jwt.sign(
        { id, username: usernameUser, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "20s",
        }
    );

    // -- membuat refresh token
    const refreshToken = jwt.sign(
        { id, username: usernameUser, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    await updateToken(refreshToken, id);
    return {
        success: true,
        msg: "login berhasil",
        accessToken,
        refreshToken,
    };
};

// untuk medapatkan token
const refreshToken = async (token) => {
    if (!token) {
        throwWithStatus("token tidak valid", 401);
    }
    const userToken = await findToken(token);
    console.log(userToken)
    await verifyToken(token, process.env.REFRESH_TOKEN_SECRET);

    const { id, username, role } = userToken;
    const accessToken = jwt.sign(
        { id, username, role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "20s",
        }
    );

    return {
        success: true,
        msg: "token berhasil didapatkan",
        token: accessToken,
    };
};

module.exports = {
    Login,
    refreshToken,
};
