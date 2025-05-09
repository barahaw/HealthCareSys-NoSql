const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save({ writeConcern: { w: "majority" } });
    // Add patient to doctor's patients array
    await Doctor.findByIdAndUpdate(
      patient.doctorId,
      { $addToSet: { patients: patient._id } },
      { new: true }
    );
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("doctorId");
    const result = patients.map((p) => {
      const obj = p.toObject();
      if (obj.doctorId && typeof obj.doctorId === "object") {
        obj.doctor = {
          _id: obj.doctorId._id,
          name: obj.doctorId.name,
          specialty: obj.doctorId.specialty,
          phone: obj.doctorId.phone,
        };
      } else {
        obj.doctor = null;
      }
      delete obj.doctorId;
      return obj;
    });
    res.json(result);
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
