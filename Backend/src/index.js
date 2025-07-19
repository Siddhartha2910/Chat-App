// Backend/index.js

import express from "express";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser"; // UNCOMMENT THIS
import cors from "cors"; // UNCOMMENT THIS

// Keep other imports commented out for now
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { initSocketServer } from "./lib/socket.js";
// import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Uncomment these middleware lines
app.use(express.json({ limit: '10mb' })); // UNCOMMENT THIS
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // UNCOMMENT THIS
app.use(cookieParser()); // UNCOMMENT THIS
app.use(cors({ // UNCOMMENT THIS
    origin: "http://localhost:5173",
    credentials: true
})); // UNCOMMENT THIS

// Keep all route-related app.use and app.get calls commented out
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../Frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
//     });
// }

// Keep initSocketServer and connectDB calls commented out
// initSocketServer(server);
// connectDB();

server.listen(PORT, () => {
    console.log(`Minimal server is running on port: ${PORT}`);
});