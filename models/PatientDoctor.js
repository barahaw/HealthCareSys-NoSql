const mongoose = require("mongoose");

const PatientDoctorSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PatientDoctor", PatientDoctorSchema);
