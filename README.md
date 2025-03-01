# BasicFullStackReactCSharp

A full-stack web application demonstrating a basic integration between a C# Web API and a React (TypeScript) frontend. The solution consists of two projects: **BackendCsharp** (C# API) and **FrontendReach** (React app). This sample app currently implements a `MessagesController` with CORS enabled to allow the frontend to fetch all messages via a button click.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [CORS Configuration](#cors-configuration)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Overview

**BasicFullStackReactCSharp** is designed as a learning example for integrating a C# Web API backend with a React (TypeScript) frontend. Key features include:

- A `MessagesController` API endpoint that retrieves all messages.
- CORS configuration to enable communication between the backend and the frontend.
- A React component that sends a GET request to the API upon clicking a button.

## Prerequisites

- **.NET SDK 6.0** (or later) – for running the C# backend.
- **Node.js** (with npm or yarn) – for installing and running the React frontend.
- **Visual Studio Code** – recommended IDE for both C# and TypeScript development.

## Installation & Setup

### Backend Setup

1. **Navigate to the Backend Folder:**

       cd BackendCsharp

2. **Restore Dependencies and Build:**

       dotnet restore
       dotnet build

3. **Run the API:**

       dotnet run

4. **Access the API:**  
   The API will typically run on `http://localhost:5194` (or as configured in your launchSettings.json).

### Frontend Setup

1. **Navigate to the Frontend Folder:**

       cd FrontendReact

2. **Install Dependencies:**

       npm install

3. **Start the Development Server:**

       npm start

4. **Access the App:**  
   The React application will run on `http://localhost:5173/`.

## CORS Configuration

To allow the React app to communicate with the C# backend, CORS is configured in the backend.

## API Endpoints

### GET /api/messages

- **Description:** Retrieves all messages.
- **Implementation:** Handled by the `MessagesController`.
- **Usage:** Triggered when the "Fetch Data from Backend" button in the frontend is clicked.
- **Response:** A JSON array of message objects.

## Usage

1. **Run the Backend API** by following the Backend Setup instructions.
2. **Start the Frontend App** using the Frontend Setup steps.
3. **Interact with the Application:**
   - Open your browser and navigate to `http://localhost:5173/`.
   - Click the "Get All Messages" button to send a GET request to the `/api/messages` endpoint.
   - View the response (the list of messages) rendered in the frontend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
