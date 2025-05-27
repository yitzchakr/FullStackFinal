const jwt = require("jsonwebtoken");
const db = require("../../config/db");
const { generateAccessToken, generateRefreshToken } = require("../../utils/token");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
    console.log(req.body);
    
  const { email, password } = req.body;
  if (!email || !password) {
    
    return res.status(400).json({ message: "Email and password are required" });
   
   
  }
  try {
    let [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].password_hash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    user = user[0];
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.Node_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // 7 days
    const desiredEntries = ['id', 'email', 'role', 'first_name', 'last_name'];
    user = Object.fromEntries(
      Object.entries(user).filter(([key]) => desiredEntries.includes(key))
    );
    res.json({ accessToken,user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);
console.log('REFRESH_TOKEN_SECRET:', process.env.REFRESH_TOKEN_SECRET);
module.exports = loginController;
