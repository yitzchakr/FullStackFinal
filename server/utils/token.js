const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    console.log("Generating token for user:", user); 
    const payload = {
        id: user.id,
        role: user.role,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    };
    
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    };
    
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
module.exports = {
    generateAccessToken,
    generateRefreshToken
};