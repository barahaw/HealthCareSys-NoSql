const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  medicalHistory: {
    type: String,
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Patient', PatientSchema);

