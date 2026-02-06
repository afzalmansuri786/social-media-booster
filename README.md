# Campaign Management System

A full-stack application for managing marketing campaigns.

- **Frontend**: Vite + React
- **Backend**: FastAPI with Uvicorn

---

## Prerequisites

### Minimum Required Versions

- **Node.js**: `>= 20.20.0`
- **Python**: `>= 3.10.11`
- **npm**
- **pip**
- **Python virtual environment (venv)**

---

## Project Structure

```text
.
├── frontend/            # Vite + React application
├── app/                 # FastAPI backend package
│   └── main.py
├── requirements.txt     # Backend dependencies
└── README.md
````

---

## Frontend Setup (Vite + React)

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Access the frontend

```text
http://localhost:5173
```

---

## Backend Setup (FastAPI + Uvicorn)

> All backend commands are run from the **root directory**.

### 1. Create virtual environment

```bash
python -m venv venv
```

### 2. Activate the virtual environment

**Linux / macOS**

```bash
source venv/bin/activate
```

**Windows**

```bash
venv\Scripts\activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the backend server

```bash
uvicorn app.main:app --reload
```

---

## Backend URLs

* **API Base URL**

  ```text
  http://127.0.0.1:8000
  ```

* **Swagger API Documentation**

  ```text
  http://localhost:8000/docs
  ```

---

## API Documentation

All APIs are documented and testable using **Swagger UI**:

```text
http://localhost:8000/docs
```

---

## API Endpoints (cURL Examples)

### Campaigns

#### Create Campaign

```bash
curl --location 'http://127.0.0.1:8000/campaigns/' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Winter Sale Campaign",
  "platform": "Twitter",
  "status": "active",
  "budget": 6520,
  "spent": 621
}'
```

---

#### Get All Campaigns

```bash
curl --location 'http://127.0.0.1:8000/campaigns/'
```

---

#### Get Campaign by ID

```bash
curl --location 'http://127.0.0.1:8000/campaigns/a37679b8-8e4e-4bbc-8d1d-146863670acc'
```

---

#### Update Campaign

```bash
curl --location --request PUT 'http://127.0.0.1:8000/campaigns/a37679b8-8e4e-4bbc-8d1d-146863670acc' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Spring Sale Campaign - Updated",
  "platform": "INstagram",
  "status": "paused",
  "budget": 5500,
  "spent": 2000
}'
```

---

#### Delete Campaign

```bash
curl --location --request DELETE 'http://127.0.0.1:8000/campaigns/a37679b8-8e4e-4bbc-8d1d-146863670acc'
```

---

### Dashboard

#### Campaign Status Summary

```bash
curl --location 'http://127.0.0.1:8000/dashboard/status-summary'
```

---

#### Budget Summary

```bash
curl --location 'http://127.0.0.1:8000/dashboard/budget-summary'
```

---

### External Services

#### Marketing Quote

```bash
curl --location 'http://127.0.0.1:8000/external/marketing-quote'
```

---

## Development Notes

* Activate the virtual environment before running the backend.
* Start the **backend first**, then the frontend.
* API testing is available via Swagger UI and You can use Postman as well.
* Ensure ports **5173** and **8000** are available.
