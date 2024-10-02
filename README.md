# BookWave

## Overview

BookWave is an online booking system for reserving co-working spaces and meeting rooms with real-time monitoring for availability. It allows users to book rooms and time slots, and admins to manage rooms and monitor bookings.

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version >= 20)
- **MongoDB** (running locally or MongoDB Atlas)

### Clone the Repository

```
git clone https://github.com/Yea-sin/BookWave.git
cd bookwave
```

### Install Dependencies

```
npm install
```

or

```
yarn install
```

### Environment Variables

Create a .env file at the root of the project and provide the following variables:

```
NODE_ENV=development
PORT=5000
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES_IN=7d
DATABASE_URL=your_mongodb_uri
BCRYPT_SALT=10

```

### Start the Application

To start the development server:

```
npm run start:dev
or
yarn start:dev
```

For production:

```
npm run start
or
yarn start

```

## Project Folder Structure

```
## src/
│
├── app/
│   ├── config/
│   │   └── index.ts
│   ├── error/
│   │   ├── handleCastError.ts
│   │   ├── handleDuplicateError.ts
│   │   ├── handleValidationError.ts
│   │   └── handleZodError.ts
│   ├── interface/
│   │   └── index.ts
│   ├── middleware/
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   └── validateRequest.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.interfaces.ts
│   │   ├── auth.models.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.services.ts
│   │   └── auth.validation.ts
│   ├── booking/
│   │   ├── booking.constants.ts
│   │   ├── booking.controller.ts
│   │   ├── booking.interfaces.ts
│   │   ├── booking.models.ts
│   │   ├── booking.routes.ts
│   │   ├── booking.services.ts
│   │   └── booking.validation.ts
│   ├── room/
│   │   ├── room.constants.ts
│   │   ├── room.controller.ts
│   │   ├── room.interfaces.ts
│   │   ├── room.models.ts
│   │   ├── room.routes.ts
│   │   ├── room.services.ts
│   │   └── room.validation.ts
│   ├── user/
│       ├── user.controller.ts
│       ├── user.interfaces.ts
│       ├── user.models.ts
│       ├── user.routes.ts
│       ├── user.services.ts
│       └── user.validation.ts
│
├── routes/
│   └── index.ts
│
├── utils/
│   ├── catchAsync.ts
│   └── sendResponse.ts
│

```

## Project Folder Structure Explanation

---

### `app/`

This folder holds core configurations and utilities for the app, including error handling and middlewares.

- **`config/`**: Contains configuration files for the application, contains .env configurations.
- **`error/`**: Handles different types of errors that might occur, such as validation errors or casting errors. It includes utilities for creating user-friendly error messages.

  - `handleCastError.ts`: Catches and handles casting errors.
  - `handleDuplicateError.ts`: Handles error when a record is duplicated.
  - `handleValidationError.ts`: Manages schema validation errors to ensure the data structure is correct before saving it to the database.
  - `handleZodError.ts`: Handles errors from Zod schemas.

- **`middleware/`**: Contains reusable middleware functions for handling errors, validation, and request processes.

  - `globalErrorHandler.ts`: A centralized error-handling middleware given by express.js that processes all errors thrown in the app.
  - `notFound.ts`: Middleware to catch unhandled routes and respond with a 404 error.

- **`validateRequest.ts`**: A function that validates incoming requests based on pre-defined zod validation schema.

---

### `modules/`

Each module represents a key part of the application's domain, such as authentication, booking, rooms, and users. Modules have their own substructure to maintain separation of concerns.

- **`auth/`**: Handles user authentication (login, signup, etc.). Each file in this module focuses on one aspect:

  - `auth.controller.ts`: Contains the logic for handling user login authentication
  - `auth.models.ts`: Defines authentication schema model for mongoose.
  - `auth.routes.ts`: Defines the API endpoints for authentication (e.g., `/login`, `/signup`).
  - `auth.services.ts`: Contains business logic for processing authentication data and interacting with the database.
  - `auth.validation.ts`: Contains validation logic to ensure user inputs (e.g., passwords, emails) are correct.

- **`booking/`**: Manages all booking-related functionality, including creating, viewing, and managing bookings.

  - `booking.controller.ts`: Defines logic for handling booking operations.
  - `booking.services.ts`: Business logic for booking operations.
  - `booking.routes.ts`: API endpoints for booking actions.
  - `booking.validation.ts`: Ensures bookings are valid.

- **`room/`**: Handles room management, including creating, updating, and viewing room details.

  - `room.controller.ts`: Manages requests related to rooms.
  - `room.models.ts`: Defines the structure of room data.
  - `room.routes.ts`: API endpoints for room-related actions.
  - `room.services.ts`: Handles business logic for managing rooms.

- **`user/`**: Manages user-related data..
  - `user.controller.ts`: Contains logic for handling user signup.
  - `user.services.ts`: Contains business logic for user signup.

---

### `routes/`

This directory defines the central routing mechanism for the entire application. The `index.ts` file imports and sets up routes from each module.

---

### `utils/`

Contains reusable utility functions that are used throughout the project to handle asynchronous requests and send responses.

- **`catchAsync.ts`**: A helper function that wraps async functions to automatically catch and handle errors.
- **`sendResponse.ts`**: Standardizes how HTTP responses are sent from the server, ensuring consistency across all endpoints.

---
