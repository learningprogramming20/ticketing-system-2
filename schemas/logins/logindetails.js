const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    loginnumber: { type: Number, unique: true },
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
  },
  { timestamps: true }
);

const Logins = mongoose.model("Logins", loginSchema);

//export the schema
module.exports = Logins;
