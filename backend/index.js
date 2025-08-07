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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    verifyToken,
    checkRole,
} = require("./src/auth-users/middleware/verifyToken");

app.get("/", (req, res) => {
    res.send("Hello Word");
});

const auth = require("./src/auth-users/controller_auth");
const pesertaDidik = require("./src/peserta-didik/controller_peserta");
const profilSekolah = require("./src/profil-sekolah/controller_sekolah");
const guru = require("./src/guru/controller_guru");
const tahun_ajaran = require("./src/tahun-ajaran/controller_tahun_ajaran");
const penilaian = require("./src/penilaian/controller_penilaian");
const amount = require("./src/amount/controller_amount");
const kesimpulan = require("./src/kesimpulan/controller_kesimpulan");
app.use("/", auth);
app.use("/amount", verifyToken, checkRole(["Operator"]), amount);
app.use("/profil-sekolah", verifyToken, checkRole(["Operator"]), profilSekolah);
app.use("/guru", verifyToken, checkRole(["Operator"]), guru);
app.use(
    "/tahun-ajaran",
    verifyToken,
    checkRole(["Operator", "Ortu"]),
    tahun_ajaran
);
app.use("/penilaian", verifyToken, checkRole(["Operator", "Ortu"]), penilaian);
app.use(
    "/kesimpulan",
    verifyToken,
    checkRole(["Operator", "Ortu"]),
    kesimpulan
);
app.use(
    "/peserta-didik",
    verifyToken,
    checkRole(["Operator", "Ortu"]),
    pesertaDidik
);

app.use((err, req, res, next) => {
    console.error(err.message); // log simple
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Terjadi kesalahan server",
    });
});

app.listen(process.env.PORT_BACKEND, () => {
    console.log(
        "Example app listening on port http://localhost:" +
            process.env.PORT_BACKEND
    );
});
