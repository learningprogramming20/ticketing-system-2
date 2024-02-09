// import express from "express";
const router = require("express").Router();

// router = express.Router();
const IspNode = require("../schemas/ispswitches");

// Create - Add a new ISP node
router.post("/", async (req, res) => {
  try {
    const {
      nodename,
      failuretime,
      restorationtime,
      outagereason,
      currentstatus,
      openedby,
      closedby,
      createdbyuserid,
      // closedbyuserid,
    } = req.body;

    // Check if a node with the same name already exists
    const existingNode = await IspNode.findOne({ nodename });
    if (existingNode) {
      return res
        .status(400)
        .json({ error: "Node with the same name already exists" });
    }

    // If the node doesn't exist, create a new entry
    const newispnode = new IspNode({
      nodename,
      failuretime,
      restorationtime,
      outagereason,
      currentstatus,
      openedby,
      closedby,
      createdbyuserid,
      // closedbyuserid,
    });

    // Save the new entry to the database
    const savedNode = await newispnode.save();

    res.status(201).send(savedNode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read - Get all ISP nodes
router.get("/", async (req, res) => {
  try {
    const ispNodes = await IspNode.find();
    res.send(ispNodes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a particular ISP node by ID
router.get("/:nodeId", async (req, res) => {
  try {
    const { nodeId } = req.params;
    const ispNode = await IspNode.findById(nodeId);

    if (!ispNode) {
      return res.status(404).json({ error: "ISP Node not found" });
    }

    res.send(ispNode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update - Update an ISP node
router.put("/:id", async (req, res) => {
  try {
    const updatedNode = await IspNode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedNode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete - Delete an ISP node
router.delete("/:id", async (req, res) => {
  try {
    await IspNode.findByIdAndDelete(req.params.id);
    res.json({ message: "ISP node deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
