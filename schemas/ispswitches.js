const mongoose = require("mongoose");

const ispNodeSchema = new mongoose.Schema(
  {
    nodename: String,
    failuretime: Date,
    restorationtime: Date,
    outagereason: String,
    currentstatus: String,
    openedby: String,
    closedby: String,
    createdbyuserid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // closedbyuserid: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

const Ispswitches = mongoose.model("Openispnodes", ispNodeSchema);

//export the schema
module.exports = Ispswitches;
