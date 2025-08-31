const router = require("express").Router();
const { PostData, updateUsers, deleteUsers } = require("./services_user");
const { findMany } = require("./repository_user");

router.get("/", async (req, res, next) => {
    try {
        const response = await findMany();
        res.json({
            success: true,
            data: response,
            message: "data berhasil didapatkan",
        });
    } catch (error) {
        next(error);
    }
});

router.post("/add-users", async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        await PostData(username, password, role);
        res.status(200).json({
            success: true,
            message: "data user berhasil ditambahkan",
        });
    } catch (error) {
        next(error);
    }
});

router.patch("/update-users/:id", async (req, res, next) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    try {
        await updateUsers(id, username, password, role, req.user);
        res.json({
            success: true,
            message: "data berhasil di update",
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/delete-users/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.id && req.user.id === id) {
            return res.status(403).json({
                success: false,
                message:
                    "Akun ini sedang dipakai untuk login, tidak bisa dihapus",
            });
        }
        await deleteUsers(id);
        res.json({
            success: true,
            messsage: "data berhasil dihapus",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
