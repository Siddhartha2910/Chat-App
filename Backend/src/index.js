// Backend/index.js

import express from "express";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"; // UNCOMMENT THIS
import { connectDB } from "./lib/db.js";
import { initSocketServer } from "./lib/socket.js";
import path from "path"; // UNCOMMENT THIS, as it will be needed for the static files if this passes

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // UNCOMMENT THIS, as it will be needed for the static files if this passes

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); // UNCOMMENT THIS

// Keep the production static file serving block commented out for now
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