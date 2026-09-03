import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import handleConnection from "./socket/handleConnection.js";

const app = express();
const server = createServer(app);

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "https://devmesh-sg7s-lemon.vercel.app";

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const io = new Server(server, {
  cors: corsOptions,
});

handleConnection(io);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "DevMesh server is running",
  });
});

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 7777;

connectDb()
  .then(() => {
    console.log("Database connected successfully!");

    server.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });