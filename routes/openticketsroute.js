const express = require("express");
const router = express.Router();
const OpenTicket = require("../schemas/opentickets");
const User = require("../schemas/user");

// Create a new open ticket
router.post("/", async (req, res) => {
  const {
    useropened,
    userclosed,
    openedby,
    email,
    telephonenumber,
    officenumber,
    site,
    region,
    affectedareas,
    servicesaffected,
    typeoffault,
    timeoferror,
    problem,
    ticketnumber,
    siteclassification,
    powersource,
    currentstatus,
    umemeref,
    closedby,
    assigntechnician,
    priority,
    escalationlevel,
    timeofrestoration,
    solution,
    closedbymethod,
    closingdepartment,
  } = req.body;

  try {
    const newOpenTicket = new OpenTicket({
      useropened,
      userclosed,
      openedby,
      email,
      telephonenumber,
      officenumber,
      site,
      region,
      affectedareas,
      servicesaffected,
      typeoffault,
      timeoferror,
      problem,
      ticketnumber,
      siteclassification,
      powersource,
      currentstatus,
      umemeref,
      closedby,
      assigntechnician,
      priority,
      escalationlevel,
      timeofrestoration,
      solution,
      closedbymethod,
      closingdepartment,
    });

    // Check if the user who opened the ticket exists
    const userOpened = await User.findById(useropened);
    if (!userOpened) {
      return res
        .status(404)
        .json({ error: "User who opened the ticket not found" });
    }
    const savedOpenTicket = await newOpenTicket.save();
    res.status(201).json(savedOpenTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all open tickets
router.get("/", async (req, res) => {
  try {
    const openTickets = await OpenTicket.find();
    res.json(openTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific open ticket by ID
router.get("/:openTicketId", async (req, res) => {
  try {
    const openTicket = await OpenTicket.findById(req.params.openTicketId);
    if (!openTicket) {
      return res.status(404).json({ error: "OpenTicket not found" });
    }
    res.json(openTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an open ticket by ID
router.put("/:openTicketId", async (req, res) => {
  try {
    const openTicket = await OpenTicket.findByIdAndUpdate(
      req.params.openTicketId,
      req.body,
      { new: true }
    );
    if (!openTicket) {
      return res.status(404).json({ error: "OpenTicket not found" });
    }
    res.json(openTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an open ticket by ID
router.delete("/:openTicketId", async (req, res) => {
  try {
    const openTicket = await OpenTicket.findByIdAndDelete(
      req.params.openTicketId
    );
    if (!openTicket) {
      return res.status(404).json({ error: "OpenTicket not found" });
    }
    res.json(openTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
