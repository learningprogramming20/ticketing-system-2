const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  name: String,
  region: String,
  classification: String,
  power_source: String,
  affected_sites: [String],
  services_offered: [String],
  is_switched_off_at_night: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDecommisioned: {
    type: Boolean,
    default: false,
  },
});

const Site = mongoose.model("Sites", siteSchema);

module.exports = Site;
