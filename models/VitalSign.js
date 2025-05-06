const mongoose = require('mongoose');

const vitalSignSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    heartRate: Number,
    bloodPressure: String,
    temperature: Number
  },
  { timeseries: true }
);

const VitalSign = mongoose.model('VitalSign', vitalSignSchema);

module.exports = VitalSign;
