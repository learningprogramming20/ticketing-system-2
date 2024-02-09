// import express from "express";
const router = require("express").Router();

// router = express.Router();
const Ticket = require("../../schemas/tickets/opentickets");
const ClosedTicket = require("../../schemas/tickets/closedtickets");

//create ticket
router.post("/", async (req, res) => {
  const {
    useropenedid,
    // userclosedid,
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
    // Check if a ticket with the same sitename already exists
    const existingTicket = await Ticket.findOne({ sitename });

    if (existingTicket) {
      // If a ticket with the same sitename exists, send a response
      return res.status(400).send({
        error:
          "Ticket with the same sitename already exists. First close it to continue",
      });
    }

    // Find the latest document and get its ticket number
    const latestTicket = await Ticket.findOne(
      {},
      {},
      { sort: { ticketnumber: -1 } }
    );

    // Increment the ticket number
    const newTicketNumber = latestTicket ? latestTicket.ticketnumber + 1 : 1;

    // console.log(latestTicket);
    // console.log(newTicketNumber);

    const ticket = Ticket({
      useropenedid,
      // userclosedid,
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
      ticketnumber: newTicketNumber,
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

    // console.log(ticket);
    await ticket.save();

    res.status(201).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    // res.status(200).json({ tickets });
    // Total number of tickets
    const totalTickets = await Ticket.countDocuments();
    const totalClosedTickets = await ClosedTicket.countDocuments();

    // Get the current date and time
    const currentDate = new Date();
    const startOfToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Total number of tickets opened today
    const ticketsOpenedToday = await Ticket.countDocuments({
      createdAt: { $gte: startOfToday },
    });
    const ticketsClosedToday = await ClosedTicket.countDocuments({
      createdAt: { $gte: startOfToday },
    });
    // Assuming the current user's ID is available in req.user.id
    // const userId = req.user.id;
    // const ticketsOpenedByUser = await Ticket.countDocuments({
    //   useropenedid: userId,
    // });

    res.status(200).json({
      tickets,
      totalTickets,
      ticketsOpenedToday,
      totalClosedTickets,
      ticketsClosedToday,
      // ticketsOpenedByUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});
// Fetch tickets opened by the current user
router.get("/opened-by/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const tickets = await Ticket.find({ useropenedid: userId });
    const totalTickets = tickets.length;
    res.status(200).json({ totalTickets, tickets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific ticket by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findById(id);
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
  const updates = req.body;
  // console.log("updates");
  // console.log(updates);

  try {
    // const ticket = await Ticket.findByIdAndUpdate(
    //   id,
    //   {
    //     $set: {
    //       sitestatus: updates.sitestatus,
    //     },
    //   },
    //   { new: true }
    // );

    const ticket = await Ticket.findByIdAndUpdate(id, updates, { new: true });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found!" });
    }
    res.status(200).json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: "Ticket deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
