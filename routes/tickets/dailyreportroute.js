const express = require("express");
const router = express.Router();
const DailyReport = require("../../schemas/tickets/dailyreport");
const User = require("../../schemas/user");

// Create a new daily report
router.post("/", async (req, res) => {
  const {
    useropenedid,
    // userclosedid,
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

  try {
    // Check if the user exists
    const userExists = await User.findById(useropenedid);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const newDailyReport = new DailyReport({
      useropenedid,
      // userclosedid,
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

    const savedDailyReport = await newDailyReport.save();
    res.status(201).json(savedDailyReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all daily reports
router.get("/", async (req, res) => {
  try {
    const dailyReports = await DailyReport.find();
    res.json(dailyReports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific daily report by ID
router.get("/:dailyReportId", async (req, res) => {
  try {
    const dailyReport = await DailyReport.findById(req.params.dailyReportId);
    if (!dailyReport) {
      return res.status(404).json({ error: "DailyReport not found" });
    }
    res.json(dailyReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a daily report by ID
router.put("/:openticketid", async (req, res) => {
  try {
    const dailyReport = await DailyReport.findOneAndUpdate(
      { openticketid: req.params.openticketid },
      req.body,
      { new: true }
    );
    // router.put("/:dailyReportId", async (req, res) => {
    //   try {
    //     const dailyReport = await DailyReport.findByIdAndUpdate(
    //       req.params.dailyReportId,
    //       req.body,
    //       { new: true }
    //     );
    if (!dailyReport) {
      return res.status(404).json({ error: "DailyReport not found" });
    }
    res.json(dailyReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a daily report by ID
router.delete("/:openticketid", async (req, res) => {
  // router.delete("/:dailyReportId", async (req, res) => {
  try {
    // const dailyReport = await DailyReport.findByIdAndDelete(
    //   req.params.dailyReportId
    // );

    const dailyReport = await DailyReport.findOneAndDelete({
      openticketid: req.params.openticketid,
    });

    if (!dailyReport) {
      return res.status(404).json({ error: "DailyReport not found" });
    }
    res.json(dailyReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
