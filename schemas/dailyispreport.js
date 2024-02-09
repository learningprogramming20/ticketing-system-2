const mongoose = require("mongoose");

const ispNodeSchema = new mongoose.Schema(
  {
    openispnodeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Openispnodes",
    },
    nodename: String,
    failuretime: Date,
    restorationtime: Date,
    outagereason: String,
    currentstatus: String,
    solution: String,
    openedby: String,
    closedby: String,
  },

  { timestamps: true }
);

const Dailyispreport = mongoose.model("Dailyispreport", ispNodeSchema);

//export the schema
module.exports = Dailyispreport;
