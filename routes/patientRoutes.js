const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post("/", patientController.createPatient);
router.get("/", patientController.getPatients);
router.get("/withDoctors", patientController.getPatientsWithDoctors);

module.exports = router;
