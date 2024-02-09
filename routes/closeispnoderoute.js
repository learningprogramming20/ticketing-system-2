const express = require("express");
const router = express.Router();
const Closeispnode = require("../schemas/closeispnode");

// Create a new Closeispnode
router.post("/", async (req, res) => {
  try {
    const newCloseispnode = await Closeispnode.create(req.body);
    res.status(201).json(newCloseispnode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all Closeispnodes
router.get("/", async (req, res) => {
  try {
    const closeispnodes = await Closeispnode.find();
    res.json(closeispnodes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a particular Closeispnode by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const closeispnode = await Closeispnode.findById(id);

    if (!closeispnode) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.json(closeispnode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Closeispnode by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCloseispnode = await Closeispnode.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedCloseispnode) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.json(updatedCloseispnode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Closeispnode by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCloseispnode = await Closeispnode.findByIdAndDelete(id);

    if (!deletedCloseispnode) {
      return res.status(404).json({ error: "Closeispnode not found" });
    }

    res.json(deletedCloseispnode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
