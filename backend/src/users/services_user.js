const { updateData, insertData, deleteData } = require("./repository_user");
const { validatorField } = require("../utils/validator");
const throwWithStatus = require("../utils/throwWithStatus");


const PostData = async (username, password, role) => {
    try {
        if (!username) {
            throwWithStatus("username tidak ada", 304);
        }
        if (!password) {
            throwWithStatus("password tidak ada", 304);
        }
        if (!role) {
            throwWithStatus("role tidak ada", 304);
        }
        const data = await insertData(username, password, role);
        return data;
    } catch (error) {
        throw error;
    }
};

const updateUsers = async (id, username, password, role, data) => {
    try {
        validatorField({
            id,
            username,
            password,
            role
        });
        const response = await updateData(id, username, password, role, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteUsers = async (id) => {
    try {
        if (!id) throwWithStatus("id tidak ditemukan", 403);
        await deleteData(id)
    } catch (error) {
        throw error;
    }
};

module.exports = {
    PostData,
    updateUsers,
    deleteUsers
};
