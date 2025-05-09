const redis = require("../config/redis");

const ALERT_PREFIX = "alert:";
const ALERT_EXPIRE = 600; // 10 minutes

async function cacheAlert(patientId, message) {
  const key = ALERT_PREFIX + patientId;
  await redis.set(key, message, "EX", ALERT_EXPIRE);
}

async function getAlert(patientId) {
  const key = ALERT_PREFIX + patientId;
  return await redis.get(key);
}

module.exports = { cacheAlert, getAlert };
