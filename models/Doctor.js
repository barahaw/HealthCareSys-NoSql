const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Doctor", doctorSchema);
