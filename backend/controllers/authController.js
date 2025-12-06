const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function signToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();
    const token = signToken(user);
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(201).json({ user: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
