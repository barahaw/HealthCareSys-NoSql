# HealthCareSys-NoSql

## Overview

A backend system for healthcare monitoring, built with Node.js, Express, MongoDB (Mongoose), and Redis. It supports CRUD operations for doctors and patients, records vital signs, and caches alerts in Redis for abnormal readings.

## Features

- Create, fetch, and manage doctors and patients
- Record and retrieve vital signs for patients
- Cache alerts in Redis if heart rate > 120
- Retrieve alerts from Redis
- Aggregated endpoint to fetch all data from MongoDB and Redis
- **AP-like and CP-like MongoDB usage:**
  - Patient and doctor creation is immediate and does not guarantee strong consistency (AP).
  - Updates to related collections (like adding a patient to a doctor's list) are fire-and-forget (AP).
  - Vital sign alerting is CP-like (strong consistency): all DB and Redis operations must succeed before responding.

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
  doctorController.js    # Doctor-related logic (AP-style)
  patientController.js   # Patient-related logic (AP-style)
  vitalSignController.js # Vital sign logic (AP/CP-style)
models/
  Doctor.js              # Doctor schema
  Patient.js             # Patient schema
  VitalSign.js           # Vital sign schema
routes/
  doctorRoutes.js        # Doctor API routes
  patientRoutes.js       # Patient API routes
  vitalRoutes.js         # Vital sign API routes
  allDataRoutes.js       # Aggregated data API route
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

- `POST /api/doctors` — Create a doctor (AP-style: immediate, no strong consistency)
- `GET /api/doctors` — List all doctors

### Patient

- `POST /api/patients` — Create a patient (AP-style: immediate, fire-and-forget doctor update)
- `GET /api/patients` — List all patients (no doctor info, AP-style: eventual consistency, no joins)
- `GET /api/patients/withDoctors` — List all patients with doctor info (CP-style: uses aggregation/joins)

### Vital Signs

- `POST /api/vitals` — Record a vital sign (CP-style: alert logic is strongly consistent, fails if Redis alert cannot be set)
- `GET /api/vitals/alert/:patientId` — Retrieve cached alert

### Aggregated Data

- `GET /all-data` — Returns all patient data from MongoDB and all keys/values from Redis (combined view, AP-style: separate sources, no strong consistency)

## Notes

- The `.env` file is required for MongoDB connection. Example:
  ```
  MONGO_URI=mongodb://localhost:27017/helathcare
  ```
- Make sure MongoDB and Redis are running before starting the server.
- All code is organized into controllers, models, routes, and services for maintainability.
- **AP-like design:** Most write operations are immediate and do not guarantee strong consistency between collections. Related updates (like doctor-patient relationships) are handled asynchronously or in a fire-and-forget manner for high availability and partition tolerance.
- **CP-like design:** Some operations (like vital sign alerting) are strongly consistent by ensuring all DB and Redis operations succeed before responding to the client.

## License

MIT
