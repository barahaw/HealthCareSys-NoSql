const Doctor = require("../models/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    // AP-like: Save doctor immediately, no strong consistency guarantees
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("_id name specialty phone");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
