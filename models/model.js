const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  First_name: {
    required: true,
    type: String,
  },
  Last_name: {
    required: true,
    type: String,
  },
  Email: {
    required: true,
    type: String,
  },
  Phone: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Data", dataSchema);
