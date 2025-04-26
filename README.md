# Health Care System

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## About

This is demo for out NoSql project

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/barahaw/HealthCareSys-NoSql.git
cd your-repo-name
npm install
```

## Usage

1. Create a `.env` file in the root of your project:

```bash
touch .env
```

2. Add your environment variables to the `.env` file, for example:

```
PORT=3000
```

3. Start the server:

```bash
npm start
```

Or if you want to run it with live reload during development:

```bash
npm install -g nodemon
nodemon index.js
```

4. Visit `http://localhost:3000` in your browser (assuming the port is 3000).

## Dependencies

This project uses:

- **[Express](https://www.npmjs.com/package/express)** (`^5.1.0`)  
  A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- **[dotenv](https://www.npmjs.com/package/dotenv)** (`^16.5.0`)  
  A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---
