 const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  };
module.exports = logout;
  
