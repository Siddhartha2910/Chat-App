// Backend/index.js

import express from "express";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js"; // UNCOMMENT THIS
// Keep messageRoutes commented out for now
// import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { initSocketServer } from "./lib/socket.js";
// Keep path commented out for now
// import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Keep __dirname commented out if not used by anything else yet
// const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Uncomment authRoutes
app.use("/api/auth", authRoutes); // UNCOMMENT THIS

// Keep other route-related app.use and app.get calls commented out
// app.use("/api/messages", messageRoutes);
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../Frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
//     });
// }

initSocketServer(server);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
});