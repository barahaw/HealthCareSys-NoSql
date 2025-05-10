# HealthCareSys-NoSql

## Overview

A backend system for healthcare monitoring, built with Node.js, Express, MongoDB (Mongoose), and Redis. It supports CRUD operations for doctors and patients, records vital signs, and caches alerts in Redis for abnormal readings.

## CAP Theorem in This System

This hybrid approach lets you balance high availability for general data with strong consistency for critical alerts.

### AP (Availability/Partition tolerance)

- Most of CRUD operations (patients, doctors) are AP: always available, eventually consistent.
- Patient and doctor creation is immediate and does not guarantee strong consistency (fire-and-forget updates).
- Most CRUD operations for patients and doctors are AP-style.

### CP (Consistency/Partition tolerance)

- Vital sign alerting is CP: always consistent between MongoDB and Redis, but may be unavailable if Redis is down.
- Vital sign alerting is CP-like: the alert is only stored in Redis if the current vital sign’s heartRate > 120, and the API returns an error if Redis fails (strong consistency between MongoDB and Redis for this operation).

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

## MongoDB Atlas Cluster Info

- **Version:** 8.0.9
- **Region:** AWS / Bahrain (me-south-1)
- **Type:** Replica Set - 3 nodes (3 replicas)
- **Backups:** Inactive
- **Linked App Services:** None Linked
- **Atlas SQL, Atlas Search, Create Index:** Available

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
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority&appName=<appName>
   ```
   Replace the placeholders with your actual MongoDB Atlas credentials.
3. Ensure MongoDB Atlas and Redis are running/accessible.
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
  MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority&appName=<appName>
  ```
- Make sure MongoDB Atlas and Redis are running/accessible before starting the server.
- All code is organized into controllers, models, routes, and services for maintainability.

## License

MIT
