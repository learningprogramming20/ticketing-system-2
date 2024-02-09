// import express from "express";
const router = require("express").Router();

const AllLogins = require("../../schemas/logins/alllogins");

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
    loginnumber,
    enteredby,
    loginid,
  } = req.body;

  try {
    const newLogin = new AllLogins({
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
      loginnumber,
      enteredby,
      loginid,
    });

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
    const logins = await AllLogins.find();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch MonthlyReport entries based on the selected date range
router.get("/date", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reports = await AllLogins.find({
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
    const login = await AllLogins.findById(req.params.id);
    if (!login) {
      return res.status(404).json({ message: "Login not found" });
    }
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a login by loginid
router.put("/:loginid", async (req, res) => {
  try {
    // Exclude _id from the update to avoid the immutable field error
    const { _id, ...updateData } = req.body;

    const updatedLogin = await AllLogins.findOneAndUpdate(
      { loginid: req.params.loginid },
      updateData,
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

// Delete a login by loginid
router.delete("/:id", async (req, res) => {
  try {
    const deletedLogin = await AllLogins.findOneAndDelete({
      loginid: req.params.id,
    });
    if (!deletedLogin) {
      return res.status(404).json({ message: "Login not found" });
    }
    res.status(200).json({ message: "Login deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a login by ID
router.put("/alllogins/:id", async (req, res) => {
  try {
    const updatedLogin = await AllLogins.findByIdAndUpdate(
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

// // Delete a login by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedLogin = await AllLogins.findByIdAndDelete(req.params.id);
//     if (!deletedLogin) {
//       return res.status(404).json({ message: "Login not found" });
//     }
//     res.status(200).json({ message: "Login deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
