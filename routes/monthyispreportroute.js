const express = require("express");
const router = express.Router();
const Monthlyispreport = require("../schemas/monthyispreport");

// Create a new Closeispnode
router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    const monthlyispreport = await Monthlyispreport.create(req.body);
    res.status(201).json(monthlyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Closeispnodes
router.get("/", async (req, res) => {
  try {
    const monthlyispreport = await Monthlyispreport.find();
    res.json(monthlyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error..............." });
  }
});

// Fetch MonthlyReport entries based on the selected date range
router.get("/bydate", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    console.log("startDate, endDate");
    console.log(startDate, endDate);

    const startOfMonth = new Date(startDate);
    const endOfMonth = new Date(endDate);

    const monthlyReports = await Monthlyispreport.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    res.status(200).send(monthlyReports);
  } catch (error) {
    console.error("Error fetching monthly reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a particular Closeispnode by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const monthlyispreport = await Monthlyispreport.findById(id);

    if (!monthlyispreport) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.send(monthlyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Closeispnode by ID
router.put("/:openispnodeid", async (req, res) => {
  try {
    const { openispnodeid } = req.params;

    console.log(req.body);
    // console.log(openispnodeid);

    // const updatedDailyispreport = await Dailyispreport.findByIdAndUpdate(
    //   id,
    //   req.body,
    //   { new: true }
    // );

    const updatedmonthlyispreport = await Monthlyispreport.findOneAndUpdate(
      { openispnodeid },
      req.body,
      {
        new: true,
      }
    );

    // try {
    //   const { id } = req.params;
    //   const updatedmonthlyispreport = await Monthlyispreport.findByIdAndUpdate(
    //     id,
    //     req.body,
    //     { new: true }
    //   );

    if (!updatedmonthlyispreport) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.json(updatedmonthlyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Closeispnode by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedmonthlyispreport = await Monthlyispreport.findByIdAndDelete(
      id
    );

    if (!deletedmonthlyispreport) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.json(deletedmonthlyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
