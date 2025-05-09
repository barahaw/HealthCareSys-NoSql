const mongoose = require("mongoose");

const vitalSignSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: Number, required: true },
});

module.exports = mongoose.model("VitalSign", vitalSignSchema);
