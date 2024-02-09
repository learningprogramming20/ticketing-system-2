const mongoose = require("mongoose");

const openTicketSchema = new mongoose.Schema(
  {
    useropenedid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // userclosedid: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    openedby: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephonenumber: {
      type: String,
    },
    officenumber: {
      type: String,
    },
    sitename: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    affectedareas: [{ type: String }],
    servicesaffected: [{ type: String }],
    typeoffault: [{ type: String }],
    timeoferror: {
      type: Date,
    },
    problem: {
      type: String,
      required: true,
    },
    ticketnumber: {
      type: Number,
      required: true,
      unique: true,
    },
    siteclassification: {
      type: String,
    },
    powersource: {
      type: String,
    },
    currentstatus: {
      type: String,
    },
    umemeref: {
      type: String,
    },

    closedby: {
      type: String,
    },
    assigntechnician: {
      type: String,
    },
    priority: {
      type: String,
    },
    escalationlevel: {
      type: String,
      default: "Level 1",
    },
    timeofrestoration: {
      type: Date,
    },
    solution: {
      type: String,
    },
    closedbymethod: {
      type: String,
    },
    closingdepartment: {
      type: String,
    },
  },
  { timestamps: true }
);

const OpenTicket = mongoose.model("Opentickets", openTicketSchema);

module.exports = OpenTicket;
