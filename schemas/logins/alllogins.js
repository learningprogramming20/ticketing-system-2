const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    loginnumber: { type: Number },
    loginref: { type: Date },
    sitename: String,
    technicianname: String,
    logintime: { type: Date },
    reasonforaccess: String,
    umemereading: Number,
    gensetrunhours: Number,
    fuelamountliters: Number,
    fuellevelbefore: Number,
    fuellevelafter: Number,
    logouttime: { type: Date },
    enteredby: String,
    loginid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Logins",
    },
  },
  { timestamps: true }
);

const Alllogins = mongoose.model("Alllogins", loginSchema);

//export the schema
module.exports = Alllogins;
