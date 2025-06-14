const jwt = require('jsonwebtoken');
const throwWithStatus = require("../../utils/throwWithStatus");

const verifyToken = (req, res, next) => {
    try {
        // 1. Cek header Authorization
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader) throwWithStatus('Authorization header missing', 401);

        // 2. Ekstrak token (support "Bearer TOKEN" atau langsung TOKEN)
        const token = authHeader.split(' ')[1] || authHeader;

        if (!token) throwWithStatus('Token not provided', 401);

        // 3. Verifikasi token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Handle error spesifik
                if (err.name === 'TokenExpiredError') {
                    throwWithStatus('Token expired', 401);
                } else if (err.name === 'JsonWebTokenError') {
                    throwWithStatus('Invalid token', 401);
                } else {
                    throwWithStatus('Unauthorized', 401);
                }
            }
            // 4. Attach decoded data ke request
            req.user = { // Simpan semua data user, bukan hanya email
                id: decoded.id,
                username: decoded.username,
                role: decoded.role // Jika ada role
            };

            next();
        });
    } catch (error) {
        next(error); // Forward error ke error handler
    }
};

// Middleware untuk cek role (opsional)
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            throwWithStatus('Forbidden: Insufficient permissions', 403);
        }
        next();
    };
};

module.exports = { 
    verifyToken, 
    checkRole 
};