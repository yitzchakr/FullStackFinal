const jwt= require("jsonwebtoken");
const { generateAccessToken } = require("../../utils/token");
const refresh =(req, res) => {

    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken){
        
        
         return res.sendStatus(401);
    }
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    });
  };
module.exports = refresh;
