# Shape Designer Web Application

A full-stack web application for creating, visualizing, modifying, and persisting geometric shapes. Built with **React**, **Spring Boot**, and **MySQL**.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [1. Database Setup (MySQL)](#1-database-setup-mysql)
  - [2. Backend Setup (Spring Boot)](#2-backend-setup-spring-boot)
  - [3. Frontend Setup (React)](#3-frontend-setup-react)
- [API Documentation](#api-documentation)
- [Pre-configured Shapes](#pre-configured-shapes)
- [Project Structure](#project-structure)

---

## Features

- **Shape Creation**: Create Rectangles, Circles, and Triangles with custom dimensions
- **Shape Visualization**: Real-time rendering using HTML5 Canvas API with dimension labels
- **Dynamic Properties**: Auto-calculated Area, Perimeter/Circumference displayed live
- **Dimension Modification**: Edit shape dimensions dynamically with instant preview
- **CRUD Operations**: Full Create, Read, Update, Delete via RESTful API
- **Data Persistence**: All shapes stored in MySQL database
- **Pre-configured Defaults**: Default Rectangle (100×100), Circle (r=50), Triangle (100×80) seeded on first run
- **Responsive Design**: Works on desktop and mobile screens
- **Input Validation**: Both client-side and server-side validation
- **Error Handling**: Global exception handler with meaningful error messages

---

## Architecture

```
┌─────────────────┐     HTTP/REST      ┌──────────────────┐     JPA/JDBC     ┌─────────┐
│  React Frontend │ ◄──────────────► │  Spring Boot API  │ ◄──────────────► │  MySQL  │
│  (Port 3000)    │                    │  (Port 8080)      │                   │  DB     │
└─────────────────┘                    └──────────────────┘                   └─────────┘
│                                      │
├── ShapeForm (Create/Edit)            ├── ShapeController (REST)
├── ShapeCanvas (Canvas API)           ├── ShapeService (Business Logic)
├── ShapeList (View/Select)            ├── ShapeRepository (JPA)
├── ShapeProperties (Area etc.)        ├── Shape Entity (JPA/Hibernate)
└── ShapeAPI (Axios)                   └── GlobalExceptionHandler
```

---

## Prerequisites

Before setting up, ensure you have the following installed:

| Tool       | Version | Download Link                                      |
|------------|---------|------------------------------------------------------|
| **Java JDK** | 21+  | https://www.oracle.com/java/technologies/downloads/ |
| **Node.js**  | 18+  | https://nodejs.org/                                 |
| **MySQL**    | 8.0+ | https://dev.mysql.com/downloads/installer/          |
| **Git**      | Any  | https://git-scm.com/                                |

> **Note**: Maven is NOT required — the project uses the Maven Wrapper (`mvnw.cmd`).

---

## Project Setup

### 1. Database Setup (MySQL)

1. Open MySQL command line or MySQL Workbench.

2. Create the database (the app can auto-create it, but you can do it manually):

```sql
CREATE DATABASE IF NOT EXISTS shape_designer_db;
```

3. Update database credentials in `backend/src/main/resources/application.properties` if your MySQL username/password differ from the defaults:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

### 2. Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd backend

# Build the project (downloads dependencies automatically)
.\mvnw.cmd clean install -DskipTests

# Run the application
.\mvnw.cmd spring-boot:run
```

The backend will start at **http://localhost:8080**.

On first startup, 3 default shapes are automatically seeded into the database.

### 3. Frontend Setup (React)

Open a **new terminal**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start at **http://localhost:3000** and automatically open in your browser.

---

## API Documentation

### Base URL: `http://localhost:8080/api`

### Endpoints

| Method   | Endpoint           | Description        | Request Body           |
|----------|--------------------|--------------------|------------------------|
| `POST`   | `/api/shapes`      | Create a new shape | ShapeRequest (JSON)    |
| `GET`    | `/api/shapes`      | Get all shapes     | —                      |
| `GET`    | `/api/shapes/{id}` | Get shape by ID    | —                      |
| `PUT`    | `/api/shapes/{id}` | Update a shape     | ShapeRequest (JSON)    |
| `DELETE` | `/api/shapes/{id}` | Delete a shape     | —                      |

### Request Body Schema (ShapeRequest)

```json
{
  "name": "My Rectangle",
  "type": "RECTANGLE",
  "dimensionData": {
    "width": 150,
    "height": 100
  }
}
```

### Shape Types & Required Dimensions

| Type        | Required Dimensions       | Area Formula              |
|-------------|---------------------------|---------------------------|
| `RECTANGLE` | `width`, `height`         | width × height            |
| `CIRCLE`    | `radius`                  | π × radius²              |
| `TRIANGLE`  | `base`, `height`          | ½ × base × height        |

### Response Body Schema (ShapeResponse)

```json
{
  "id": 1,
  "name": "My Rectangle",
  "type": "RECTANGLE",
  "dimensionData": {
    "width": 150.0,
    "height": 100.0
  },
  "area": 15000.0,
  "createdAt": "2026-02-18T10:30:00"
}
```

### Example API Calls (using curl)

**Create a Circle:**
```bash
curl -X POST http://localhost:8080/api/shapes \
  -H "Content-Type: application/json" \
  -d '{"name":"My Circle","type":"CIRCLE","dimensionData":{"radius":75}}'
```

**Get all shapes:**
```bash
curl http://localhost:8080/api/shapes
```

**Update a shape:**
```bash
curl -X PUT http://localhost:8080/api/shapes/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Rectangle","type":"RECTANGLE","dimensionData":{"width":200,"height":150}}'
```

**Delete a shape:**
```bash
curl -X DELETE http://localhost:8080/api/shapes/1
```

### Error Responses

**404 Not Found:**
```json
{
  "timestamp": "2026-02-18T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Shape not found with id: 99"
}
```

**400 Validation Error:**
```json
{
  "timestamp": "2026-02-18T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "messages": {
    "name": "Shape name is required"
  }
}
```

---

## Pre-configured Shapes

On first startup (when the `shapes` table is empty), the following defaults are seeded:

| Shape             | Type      | Dimensions                    | Area     |
|-------------------|-----------|-------------------------------|----------|
| Default Rectangle | RECTANGLE | width: 100, height: 100       | 10000.0  |
| Default Circle    | CIRCLE    | radius: 50                    | 7853.98  |
| Default Triangle  | TRIANGLE  | base: 100, height: 80         | 4000.0   |

---

## Project Structure

```
shape-designer/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/shapesdesigner/
│   │   ├── ShapeDesignerApplication.java    # Main entry point
│   │   ├── config/
│   │   │   ├── WebConfig.java               # CORS configuration
│   │   │   └── DataSeeder.java              # Default shapes seeder
│   │   ├── controller/
│   │   │   └── ShapeController.java         # REST API endpoints
│   │   ├── dto/
│   │   │   ├── ShapeRequest.java            # Request DTO
│   │   │   └── ShapeResponse.java           # Response DTO (with area)
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java  # Global error handler
│   │   │   └── ShapeNotFoundException.java  # Custom 404 exception
│   │   ├── model/
│   │   │   ├── Shape.java                   # JPA Entity
│   │   │   └── converter/
│   │   │       └── DimensionDataConverter.java  # JSON converter
│   │   ├── repository/
│   │   │   └── ShapeRepository.java         # JPA Repository
│   │   └── service/
│   │       └── ShapeService.java            # Business logic & area calc
│   ├── src/main/resources/
│   │   └── application.properties           # App configuration
│   └── pom.xml                              # Maven dependencies
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── shapeApi.js                  # Axios API client
│   │   ├── components/
│   │   │   ├── ShapeCanvas/                 # Canvas rendering
│   │   │   ├── ShapeForm/                   # Create/Edit form
│   │   │   ├── ShapeList/                   # Shape list view
│   │   │   └── ShapeProperties/             # Properties display
│   │   ├── App.js                           # Main application
│   │   └── App.css                          # Global styles
│   └── package.json
│
└── README.md
```

---

## Testing

### Testing the Backend API

After starting the backend, you can test with curl or any API client (Postman, Insomnia):

```bash
# 1. Verify the server is running
curl http://localhost:8080/api/shapes

# 2. Should return 3 default shapes as JSON array

# 3. Create a new shape
curl -X POST http://localhost:8080/api/shapes ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test Shape\",\"type\":\"CIRCLE\",\"dimensionData\":{\"radius\":25}}"

# 4. Verify it was created
curl http://localhost:8080/api/shapes

# 5. Update the shape (replace {id} with actual ID from step 3)
curl -X PUT http://localhost:8080/api/shapes/{id} ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Updated Shape\",\"type\":\"CIRCLE\",\"dimensionData\":{\"radius\":50}}"

# 6. Delete the shape
curl -X DELETE http://localhost:8080/api/shapes/{id}
```

---

## VS Code Recommended Extensions

- **Extension Pack for Java** (vscjava.vscode-java-pack)
- **Spring Boot Extension Pack** (vmware.vscode-boot-dev-pack)
- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
