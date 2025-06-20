const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../utils/token');

const initUser = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // Check for refresh token if access token is missing
        const refreshToken = req.cookies?.refreshToken; // Assuming refresh token is stored in an HTTP-only cookie
        if (!refreshToken) {
            
            return res.status(401).json({ message: 'Access token and refresh token are missing' });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            // Generate a new access token
            console.log(user);
            const newAccessToken = generateAccessToken(user);
            res.json({ user, accessToken: newAccessToken });
        });
    } else {
        // Verify the access token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err.stack);
                
                return res.status(401).json({ message: 'Invalid access token' });
            }
            console.log(user);
            
            res.json({ user });
        });
    }
};

module.exports = initUser;