# codemesh Backend

The backend for codemesh is a RESTful API built with Node.js, Express, and MongoDB, featuring real-time communication via Socket.io.

## 🛠 Architecture

The server follows a modular Controller-Route-Model pattern to ensure scalability and maintainability.

### Directory Structure

- `src/app.js`: The main entry point of the application. It initializes the Express app, connects to MongoDB, sets up middleware, and starts the Socket.io server.
- `src/constants.js`: Centralized constants used across the application (e.g., `USER_SAFE_DATA`).
- `src/config/`:
  - `database.js`: MongoDB connection logic.
  - `cloudinary.js`: Configuration for profile image uploads.
- `src/models/`: (Mongoose Schemas)
  - `user.js`: Defines the User profile, authentication details, and basic user data.
  - `request.js`: Handles connection requests between users (Interested, Accepted, Rejected).
  - `chat.js`: Stores chat room details and message history between participants.
- `src/routes/`: Express routers that define the API endpoints.
  - `auth.js`: Registration, login, and logout.
  - `profile.js`: Profile retrieval and editing.
  - `user.js`: Feed discovery, connection management, and user details.
  - `request.js`: Sending and reviewing connection requests.
  - `chat.js`: Fetching chat history.
- `src/controllers/`: The business logic for each route.
  - `auth.js`, `profile.js`, `user.js`, `request.js`, `chat.js`.
- `src/middlewares/`:
  - `auth.js`: Middleware to verify JWT tokens and attach the user object to the request.
- `src/socket/`:
  - `handleConnection.js`: Manages real-time events for chat and notifications.
- `src/utils/`:
  - `validation.js`: Input validation logic for requests and profiles.
  - `socket.js`: Socket utility functions.

## 🗄 Data Models

### User Model
Stores identity and profile information.
- `name`: Full name of the user.
- `username`: Unique handle for the user.
- `email`: Unique email address.
- `password`: Hashed password.
- `about`: Short bio.
- `skills`: Array of technologies.
- `imageUrl`: Link to the profile picture.

### Request Model
Tracks the state of a connection request.
- `sender`: Reference to the User who sent the request.
- `receiver`: Reference to the User receiving the request.
- `status`: Enum (`interested`, `accepted`, `rejected`).

### Chat Model
Stores the conversation between two users.
- `participants`: Array containing the IDs of the two users.
- `messages`: Array of message objects (sender, content, timestamp).

## 🚀 Setup
1. Install dependencies: `npm install`
2. Configure `.env` with `MONGO_URI`, `JWT_SECRET`, and `CLOUDINARY` credentials.
3. Start the server: `npm start` or `npm run dev`
