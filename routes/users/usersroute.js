// import express from "express";
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// router = express.Router();
const User = require("../../schemas/user");

router.post("/register", async (req, res) => {
  const { name, username, email, password, phonenumber, officenumber, roles } =
    req.body;
  // console.log(req.body);

  // Check if the email is already registered
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email is already in use" });
  }

  // const hashedpassword = bcrypt.hashSync(password, 10);
  const hashedpassword = bcrypt.hashSync(password, 10);
  // const hashedpassword = await bcrypt.hash(password, 10);
  // res.send(hashedpassword);

  try {
    const newuser = User({
      name,
      username,
      email,
      password: hashedpassword,
      roles,
      phonenumber,
      officenumber,
    });
    await newuser.save();
    res.status(201).json(newuser);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

// Route to handle user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If the credentials are valid, create and send an access token
    const accessToken = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "15m", // You can customize the expiration time
    });

    res.json({ accessToken, userid: user._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if the user with the given username exists
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the provided password matches the stored hashed password
//     const validPassword = await bcrypt.compare(password, user.password);

//     if (!validPassword) {
//       return res.status(401).json({ message: "Invalid password or email" });
//     }
//     // Generate an access token
//     const accessToken = jwt.sign({ userId: user._id }, "your-secret-key", {
//       expiresIn: "30s",
//     });

//     // Generate a refresh token (with a longer expiration time)
//     const refreshToken = jwt.sign({ userId: user._id }, "your-refresh-key", {
//       expiresIn: "1hr",
//     });

//     // Store the refresh token in the user's document
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Set refresh token as HttpOnly cookie
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
//     });

//     res.status(200).json({ accessToken, userId: user._id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, "your-refresh-key");

    // Look up the user based on the refresh token
    const user = await User.findOne({ _id: decoded.userId, refreshToken });

    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Remove the refresh token from the user's document
    user.refreshToken = undefined;
    await user.save();

    // Generate a new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      "your-secret-key",
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: "Token refresh failed" });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId, "-password"); // Exclude the password field from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Display user data endpoint
// router.get("/user/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((u) => u.id === userId);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json(user);
// });
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
