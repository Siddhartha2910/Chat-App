// Backend/index.js

import express from "express";
import dotenv from "dotenv";
import http from "http"; // Ensure http is imported

// Comment out all other imports for this test
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { initSocketServer } from "./lib/socket.js";
// import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app); // Create the server

const PORT = process.env.PORT || 5000; // Define a port

// Comment out all app.use and app.get calls
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../Frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
//     });
// }

// Comment out initSocketServer and connectDB calls
// initSocketServer(server);
// connectDB(); // This would be called inside server.listen in your original code

server.listen(PORT, () => {
    console.log(`Minimal server is running on port: ${PORT}`);
    // No connectDB or socket.io init here for this test
});