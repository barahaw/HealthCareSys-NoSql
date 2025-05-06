const connectDB = require('./config/db');
connectDB();
//connect with  mongo db
const express = require("express");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("This is Our app ");
});
//connect with the local host

app.use("/api/patients", require("./routes/patientRoutes"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
