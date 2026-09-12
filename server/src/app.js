import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDb from "./config/database.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import handleConnection from "./socket/handleConnection.js";

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 7777;

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
// 
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Socket.IO
const io = new Server(server, { cors: corsOptions });
handleConnection(io);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "DevMesh server is running",
  });
});

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    message: "Internal server error",
  });
});

// Start server
connectDb()
  .then(() => {
    console.log("Database connected successfully!");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });