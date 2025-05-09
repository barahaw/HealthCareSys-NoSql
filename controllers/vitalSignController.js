const VitalSign = require("../models/VitalSign");
const Patient = require("../models/Patient");

// Patch alertService to log Redis keys
const {
  cacheAlert: origCacheAlert,
  getAlert: origGetAlert,
} = require("../services/alertService");
async function cacheAlertWithLog(patientId, message) {
  const key = "alert:" + patientId;
  console.log("[cacheAlert] Setting Redis key:", key, "message:", message);
  return origCacheAlert(patientId, message);
}
async function getAlertWithLog(patientId) {
  const key = "alert:" + patientId;
  const value = await origGetAlert(patientId);
  console.log("[getAlert] Getting Redis key:", key, "value:", value);
  return value;
}

exports.recordVitalSign = async (req, res) => {
  try {
    const { patientId, heartRate, bloodPressure, temperature } = req.body;
    const vital = new VitalSign({
      patientId,
      heartRate,
      bloodPressure,
      temperature,
    });
    await vital.save({ writeConcern: { w: "majority" } });

    // Store alert in Redis only if the current heartRate > 120
    if (heartRate > 120) {
      const patient = await Patient.findById(patientId);
      const message = `ALERT: High heart rate detected for patient ${
        patient ? patient.name : patientId
      }`;
      try {
        await cacheAlertWithLog(
          patientId.toString(),
          `${message} | Heart Rate: ${heartRate}`
        );
      } catch (redisErr) {
        return res.status(500).json({
          error: "Failed to set alert in Redis",
          details: redisErr.message,
        });
      }
    }
    res.status(201).json(vital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAlert = async (req, res) => {
  try {
    const { patientId } = req.params;
    const alert = await getAlertWithLog(patientId);
    console.log("Getting alert for patientId:", patientId, "alert:", alert); // Debug log
    if (alert) {
      res.json({ alert });
    } else {
      res.status(404).json({ message: "No alert found for this patient." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVitalSigns = async (req, res) => {
  try {
    const vitals = await VitalSign.find().populate("patientId", "name");
    res.json(vitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
