module.exports = function throwWithStatus(message, status = 400) {
    const error = new Error(message);
    error.status = status;
    throw error;
};
