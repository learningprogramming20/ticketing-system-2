const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../schemas/user");

// Create a new user
router.post("/", async (req, res) => {
  const { name, username, email, password, phonenumber, role, officenumber } =
    req.body;

  // Check if the email is already registered
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email is already in use" });
  }

  // const hashedpassword = bcrypt.hashSync(password, 10);
  const hashedpassword = bcrypt.hashSync(password, 10);

  try {
    const newuser = User({
      name,
      username,
      email,
      phonenumber,
      role,
      officenumber,
      password: hashedpassword,
    });
    await newuser.save();
    res.status(201).json(newuser);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

// Read all users
router.get("/", async (req, res) => {
  try {
    // const users = await User.find();
    const users = await User.find({}, "-password"); // Exclude the password field from the response
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific user by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put("/:userId", async (req, res) => {
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
