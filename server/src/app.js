import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import handleConnection from "./socket/handleConnection.js";
import chatRouter from "./routes/chat.js";

const app = express();
const server = createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions,
});

handleConnection(io);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

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
      console.log(`App is running on the port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });