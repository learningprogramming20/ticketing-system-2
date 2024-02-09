const express = require("express");
const router = express.Router();
const MonthlyReport = require("../../schemas/tickets/monthlyreport");

// Create a new daily report
router.post("/", async (req, res) => {
  try {
    const newMonthlyReport = MonthlyReport(req.body);

    const savedMonthlyReport = await newMonthlyReport.save();
    res.status(201).json(savedMonthlyReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all daily reports
router.get("/", async (req, res) => {
  try {
    const monthlyReport = await MonthlyReport.find();
    res.json(monthlyReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/bydate", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reports = await MonthlyReport.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.json({ reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/allmonthlyreport", async (req, res) => {
//   try {
//     const report = await MonthlyReport.find({});
//     res.json(report);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Read a specific daily report by ID
router.get("/:monthlyReportId", async (req, res) => {
  try {
    const monthlyReport = await MonthlyReport.findById(
      req.params.monthlyReportId
    );
    if (!monthlyReport) {
      return res.status(404).json({ error: "DailyReport not found" });
    }
    res.json(monthlyReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a daily report by ID
router.put("/:openticketid", async (req, res) => {
  try {
    const monthlyReport = await MonthlyReport.findOneAndUpdate(
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
    if (!monthlyReport) {
      return res.status(404).json({ error: "DailyReport not found" });
    }
    res.json(monthlyReport);
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

    const monthlyReport = await MonthlyReport.findOneAndDelete({
      openticketid: req.params.openticketid,
    });

    if (!monthlyReport) {
      return res.status(404).json({ error: "DailyReport not found" });
    }
    res.json(monthlyReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
