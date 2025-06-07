const jwt = require('jsonwebtoken')
const throwWithStatus = require("../../utils/throwWithStatus");
const verifyToken = (req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) throwWithStatus('Unauthorized', 401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) throwWithStatus('Unauthorized', 401)
        req.email = decoded.email
        next()
    })
}

module.exports = {verifyToken}