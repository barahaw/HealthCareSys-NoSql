const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    // AP-like: Save patient without waiting for doctor update (eventual consistency)
    await patient.save();
    // Fire-and-forget doctor update (no await, no error handling)
    Doctor.findByIdAndUpdate(
      patient.doctorId,
      { $addToSet: { patients: patient._id } },
      { new: true }
    ).catch(() => {});
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // No populate, just raw patient data
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientsWithDoctors = async (req, res) => {
  const results = await Patient.aggregate([
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctorInfo",
      },
    },
    {
      $unwind: {
        path: "$doctorInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        age: 1,
        address: 1,
        phone: 1,
        medicalHistory: 1,
        region: 1,
        doctor: {
          _id: "$doctorInfo._id",
          name: "$doctorInfo.name",
          specialty: "$doctorInfo.specialty",
          phone: "$doctorInfo.phone",
        },
      },
    },
  ]);
  res.json(results);
};
