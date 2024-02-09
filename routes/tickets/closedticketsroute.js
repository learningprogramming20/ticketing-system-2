// import express from "express";
const router = require("express").Router();

const ClosedTicket = require("../../schemas/tickets/closedtickets");

//create closed ticket
router.post("/", async (req, res) => {
  const {
    userclosedid,
    openticketid,
    openedby,
    email,
    telephonenumber,
    officenumber,
    sitename,
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
  // console.log(req.body);
  try {
    const ticket = ClosedTicket({
      userclosedid,
      openticketid,
      openedby,
      email,
      telephonenumber,
      officenumber,
      sitename,
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
    await ticket.save();

    res.status(201).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all closed tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await ClosedTicket.find({});
    res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// Get a specific ticket by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await ClosedTicket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found!" });
    }
    res.status(200).json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { updates } = req.body;
  // console.log(req.body);

  try {
    const ticket = await ClosedTicket.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!ticket) {
      return res.status(404).json({ message: "Closed Ticket not found!" });
    }
    res.status(200).json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
