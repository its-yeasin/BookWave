# BookWave

## Overview

BookWave is an online booking system for reserving co-working spaces and meeting rooms with real-time monitoring for availability. It allows users to book rooms and time slots, and admins to manage rooms and monitor bookings.

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version >= 20)
- **MongoDB** (running locally or on a cloud service like MongoDB Atlas)

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

## API Endpoints

### Authentication

**Sign Up**

- **POST** /api/auth/sign-up
- **Description:** Creates a new user.
- **Request Body:**

```
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin",
  "address": "123 Main Street, City, Country"
}


```

**Login**

- **POST** /api/auth/login
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**

```
{
    "email": "web@programming-hero.com",
    "password": "ph-password",
}
```

### Rooms

Create Room (Admin)

- **POST** /api/rooms
- **Description:** Admins can create rooms.
- **Authorization:** Should have token in headers and must include "Bearer" at the beginning of the token
- **Request Body:**

```
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

Get All Rooms

- **GET** /api/rooms
- **Description:** Fetches all available rooms.

```


```

### Slots

Create Slot (Admin)

- **POST** /api/slots
- **Description:** Admins can create time slots for rooms.
- **Authorization:** Should have token in headers and must include "Bearer" at the beginning of the token
- **Request Body:**

```
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```
