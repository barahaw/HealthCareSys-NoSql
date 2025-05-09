const express = require("express");
const router = express.Router();
const vitalSignController = require("../controllers/vitalSignController");

router.post("/", vitalSignController.recordVitalSign);
router.get("/", vitalSignController.getVitalSigns);
router.get("/alert/:patientId", vitalSignController.getAlert);

module.exports = router;
