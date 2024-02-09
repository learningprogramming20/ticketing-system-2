const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    phonenumber: String,
    officenumber: String,
    roles: {
      type: [String],
      default: ["employee"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
