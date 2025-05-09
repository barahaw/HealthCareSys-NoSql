const express = require("express");
const Patient = require("../models/Patient");
const redisClient = require("../config/redis");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    const keys = await redisClient.keys("*");
    const redisData = {};
    for (const key of keys) {
      const type = await redisClient.type(key);
      let value;
      switch (type) {
        case "string":
          value = await redisClient.get(key);
          break;
        case "list":
          value = await redisClient.lRange(key, 0, -1);
          break;
        case "set":
          value = await redisClient.sMembers(key);
          break;
        case "zset":
          value = await redisClient.zRange(key, 0, -1, { WITHSCORES: true });
          break;
        case "hash":
          value = await redisClient.hGetAll(key);
          break;
        default:
          value = `Type ${type} not handled`;
      }
      redisData[key] = { type, value };
    }
    res.json({ mongo: patients, redis: redisData });
  } catch (error) {
    console.error("Error fetching all data:", error);
    res
      .status(500)
      .json({ message: "Error fetching all data", error: error.message });
  }
});

module.exports = router;
