const express = require("express");
const router = express.Router();
const User = require("../models/loginModel");

// Login Routes

router.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  // Basic validation
  if (!phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ phoneOrEmail: phone });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or phone number." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Successful login
    req.session.user = user;
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Signup route

router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup Page" });
});
router.post("/signup", async (req, res) => {
  const { phoneOrEmail, password } = req.body;

  try {
    const existingUser = await User.findOne({ phoneOrEmail });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ phoneOrEmail, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});



module.exports = router;
