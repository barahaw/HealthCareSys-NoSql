# HealthCareSys-NoSql

## Overview

A backend system for healthcare monitoring, built with Node.js, Express, MongoDB (Mongoose), and Redis. It supports CRUD operations for doctors and patients, records vital signs, and caches alerts in Redis for abnormal readings.

## Features

- Create, fetch, and manage doctors and patients
- Record and retrieve vital signs for patients
- Cache alerts in Redis if heart rate > 120
- Retrieve alerts from Redis
- Aggregated endpoint to fetch all data from MongoDB and Redis

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis (node-redis)

## Project Structure

```
server.js                # Main server file
package.json             # Project metadata and dependencies
.env                     # Environment variables (not committed)
config/
  mongodb.js             # MongoDB connection logic
  redis.js               # Redis connection logic
controllers/
  doctorController.js    # Doctor-related logic
  patientController.js   # Patient-related logic
  vitalSignController.js # Vital sign logic
models/
  Doctor.js              # Doctor schema
  Patient.js             # Patient schema
  VitalSign.js           # Vital sign schema
routes/
  doctorRoutes.js        # Doctor API routes
  patientRoutes.js       # Patient API routes
  vitalRoutes.js         # Vital sign API routes
services/
  alertService.js        # Alert logic for vital signs
README.md                # Project documentation
```

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in the root directory with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/helathcare
   ```
3. Ensure MongoDB and Redis are running locally on their default ports.
4. Start the server:
   ```sh
   node server.js
   ```

## API Endpoints

### Doctor

- `POST /api/doctors` — Create a doctor
- `GET /api/doctors` — List all doctors

### Patient

- `POST /api/patients` — Create a patient
- `GET /api/patients` — List all patients (no doctor info)
- `GET /api/patients/withDoctors` — List all patients with doctor info

### Vital Signs

- `POST /api/vitals` — Record a vital sign (caches alert if heartRate > 120)
- `GET /api/vitals/alert/:patientId` — Retrieve cached alert

### Aggregated Data

- `GET /all-data` — Returns all patient data from MongoDB and all keys/values from Redis (combined view)

## Notes

- The `.env` file is required for MongoDB connection. Example:
  ```
  MONGO_URI=mongodb://localhost:27017/helathcare
  ```
- Make sure MongoDB and Redis are running before starting the server.
- All code is organized into controllers, models, routes, and services for maintainability.

## License

MIT
