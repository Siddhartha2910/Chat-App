import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
// import {app,server} from "./lib/socket.js"; // <-- REMOVE THIS LINE
import { initSocketServer } from "./lib/socket.js"; // <-- ADD THIS LINE
import path from "path";
import http from "http"; // <-- ADD THIS LINE to create the server here

dotenv.config();

const app = express(); // <-- CREATE THE EXPRESS APP HERE, ONCE
const server = http.createServer(app); // <-- CREATE THE HTTP SERVER HERE, ONCE

const PORT = process.env.PORT || 5000; // Provide a default port

const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Your API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

// Initialize Socket.IO with the SAME server instance
initSocketServer(server); // <-- Pass the server instance to socket.js

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
});