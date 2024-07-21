const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Signup route (existing code)
router.post("/signup", async (req, res) => {
  // Existing signup code
});

// Signin route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token with the user ID included in the payload
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    // Send the token in the response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/validate-token", authMiddleware, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
