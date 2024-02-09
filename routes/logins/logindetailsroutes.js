// import express from "express";
const router = require("express").Router();

const Logins = require("../../schemas/logins/logindetails");

// // Middleware to increment loginNumber and reset it if it's a new day
// loginSchema.pre('save', async function (next) {
//   const today = new Date().toLocaleDateString();

//   if (!this.lastResetDate || this.lastResetDate.toLocaleDateString() !== today) {
//     // Reset the loginNumber to 1 if it's a new day
//     this.loginNumber = 1;
//     this.lastResetDate = new Date();
//   } else {
//     // Increment the loginNumber for the same day
//     const latestLogin = await Login.findOne({}, {}, { sort: { 'loginNumber': -1 } });
//     this.loginNumber = latestLogin ? latestLogin.loginNumber + 1 : 1;
//   }

//   next();
// });

let currentLoginNumber = 1;

// Create a new login
router.post("/", async (req, res) => {
  const {
    loginref,
    sitename,
    technicianname,
    logintime,
    reasonforaccess,
    umemereading,
    gensetrunhours,
    fuelamountliters,
    fuellevelbefore,
    fuellevelafter,
    logouttime,
    enteredby,
  } = req.body;

  try {
    // Find the last login document and get the next login number
    // const lastLogin = await Logins.findOne().sort({ loginnumber: -1 });
    // const nextLoginNumber = lastLogin ? lastLogin.loginnumber + 1 : 1;

    // Create a new login with the provided data and auto-incremented loginnumber
    const newLogin = new Logins({
      loginref,
      sitename,
      technicianname,
      logintime,
      reasonforaccess,
      umemereading,
      gensetrunhours,
      fuelamountliters,
      fuellevelbefore,
      fuellevelafter,
      logouttime,
      loginnumber: currentLoginNumber,
      enteredby,
    });

    currentLoginNumber++;

    // const newLogin = Logins(req.body);
    await newLogin.save();
    res.status(201).json(newLogin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all logins
router.get("/", async (req, res) => {
  try {
    const logins = await Logins.find();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch MonthlyReport entries based on the selected date range
router.get("/date", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    console.log(req.query);

    const reports = await Logins.find({
      loginref: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.send(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific login by ID
router.get("/:id", async (req, res) => {
  try {
    const login = await Logins.findById(req.params.id);
    if (!login) {
      return res.status(404).json({ message: "Login not found" });
    }
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a login by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedLogin = await Logins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLogin) {
      return res.status(404).json({ message: "Login not found" });
    }
    res.status(200).json(updatedLogin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a login by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedLogin = await Logins.findByIdAndDelete(req.params.id);
    if (!deletedLogin) {
      return res.status(404).json({ message: "Login not found" });
    }
    res.status(200).json({ message: "Login deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
