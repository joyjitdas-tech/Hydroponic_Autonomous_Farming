# Strawberry AI Frontend

React-based frontend dashboard for the Strawberry AI project.

The frontend provides a user interface for:

* Strawberry disease detection
* Environment monitoring
* Environment analysis
* Environment simulation
* AI service status monitoring

The frontend communicates with the backend through the Strawberry AI API Gateway.

## Repositories

| Component                 | Repository                                         |
| ------------------------- | -------------------------------------------------- |
| Frontend                  | [Strawberry AI Frontend](https://github.com/joyjitdas-tech/Hydroponic-strawberry-ai-frontend)   |
| API Gateway               | [Strawberry AI Gateway](https://github.com/joyjitdas-tech/Hydroponic-strawberry_ai-gateway)     |
| Disease Detection Service | [Disease Detection Service](https://github.com/joyjitdas-tech/Hydroponic-strawberry_ai-disease-detection) |
| Environment Service       | [Environment Service](https://github.com/joyjitdas-tech/Hydroponic-strawberry_ai-Enviroment)   |

## Architecture

```text
Frontend
React + Vite
    |
    v
API Gateway :8000
    |
    +----> Disease Detection Service :8001
    |
    +----> Environment Service :8002
```

## Requirements

* Node.js 18+
* npm

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/joyjitdas-tech/Hydroponic-strawberry-ai-frontend
cd strawberry-ai-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Backend Requirement

The API Gateway must be running at:

```text
http://127.0.0.1:8000
```

The Gateway communicates with:

```text
Disease Detection Service:
http://127.0.0.1:8001

Environment Service:
http://127.0.0.1:8002
```

## Main Features

### Disease Detection

Upload a strawberry image and select the available detection model.

The frontend communicates with:

```text
POST /analyze
```

through the API Gateway.

### Environment Monitoring

Displays environmental sensor information including:

* pH
* TDS
* Water level
* Temperature
* Humidity
* Water temperature

### Environment Analysis

Sensor data is sent through:

```text
POST /environment/analyze
```

### Environment Simulation

Simulation data is sent through:

```text
POST /environment/simulate
```

### Service Status

The frontend checks:

```text
GET /health
```

from the API Gateway to display the status of:

* Gateway
* Disease Detection Service
* Environment Service

## Project Structure

```text
strawberry-ai-frontend/
│
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── index.html
```

## Development

Start development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## System Flow

```text
                    Strawberry AI
                         |
                    React Frontend
                         |
                    API Gateway
                   /            \
                  /              \
                 ↓                ↓
        Disease Detection    Environment
             Service            Service
                 |                |
                 ↓                ↓
          Disease Result     Environment Result
                 \                /
                  \              /
                   ↓            ↓
                    React Dashboard
```

## Important

The frontend is responsible only for the user interface and API communication.

AI inference is performed by the backend services.

The frontend does not contain the trained AI models.
