const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials: kindly check your password" });

    // Send a simple response for successful login
    res.status(200).json({ message: "Login successful"});
    // res.status(200).json({ message: "Login successful", userId: user._id });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signup, login };
