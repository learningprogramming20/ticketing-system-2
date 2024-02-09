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
    closedbyuserid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Closeispnode = mongoose.model("Closeispnode", ispNodeSchema);

//export the schema
module.exports = Closeispnode;
