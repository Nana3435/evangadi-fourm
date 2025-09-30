const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  console.log(" Register request received:", req.body);

  if (!username || !firstname || !lastname || !email || !password) {
    console.log(" Missing registration fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log(" Existing user check:", existingUser);

    if (existingUser.length > 0) {
      console.log(" Email already registered:", email);
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(" Hashed password:", hashedPassword);

    await db.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    console.log("User registered");
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(" Register error:", error.message);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(" Login request received:", req.body);

  if (!email || !password) {
    console.log(" Missing login fields");
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log(" DB query result:", rows);

    const user = rows[0];
    if (!user) {
      console.log(" User not found:", email);
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(" Password match:", isMatch);

    if (!isMatch) {
      console.log(" Invalid password");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.userid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(" JWT generated");

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.userid,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};
// check
const check = (req, res) => {
  console.log("Check route hit");
  return res.json({ message: "Check route working" });
};

module.exports = { register, login, check };
