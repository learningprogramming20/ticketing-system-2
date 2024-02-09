const express = require("express");
const router = express.Router();
const Dailyispreport = require("../schemas/dailyispreport");

// Create a new Closeispnode
router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    const dailyispreport = await Dailyispreport.create(req.body);
    res.status(201).json(dailyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Closeispnodes
router.get("/", async (req, res) => {
  try {
    const dailyispreport = await Dailyispreport.find();
    res.json(dailyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a particular Closeispnode by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dailyispreport = await Dailyispreport.findById(id);

    if (!dailyispreport) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.send(dailyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Closeispnode by ID
router.put("/:openispnodeid", async (req, res) => {
  try {
    const { openispnodeid } = req.params;

    console.log(req.body);
    console.log(openispnodeid);

    // const updatedDailyispreport = await Dailyispreport.findByIdAndUpdate(
    //   id,
    //   req.body,
    //   { new: true }
    // );

    const updatedDailyispreport = await Dailyispreport.findOneAndUpdate(
      { openispnodeid },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedDailyispreport) {
      return res.status(404).json({ error: "node not found" });
    }

    res.json(updatedDailyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Closeispnode by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDailyispreport = await Dailyispreport.findByIdAndDelete(id);

    if (!deletedDailyispreport) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.json(deletedDailyispreport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
