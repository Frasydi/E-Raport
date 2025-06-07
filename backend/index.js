const express = require("express");
const app = express();
const session = require("express-session");
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cookie());
app.use(cors({ credentials: true, origin: "htpp://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { verifyToken } = require("./src/auth-users/middleware/verifyToken");

app.get("/", (req, res) => {
    res.send("Hello Word");
});

const auth = require("./src/auth-users/controller_auth");
const user = require("./src/peserta-didik/controller_peserta");

app.use("/", auth);
app.use("/", verifyToken, user);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        msg: err.message || "Terjadi kesalahan server",
    });
});

app.listen(process.env.PORT_BACKEND, () => {
    console.log(
        "Example app listening on port http://localhost:" +
            process.env.PORT_BACKEND
    );
});
