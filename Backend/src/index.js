import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { initSocketServer } from "./lib/socket.js"; // Renamed from { io, app, server }
import path from "path";
import http from "http"; // Import http module

dotenv.config();

const app = express(); // Create Express app here
const server = http.createServer(app); // Create HTTP server using the app

const PORT = process.env.PORT || 5000;

// __dirname is not available in ES modules by default.
// path.resolve() works relative to current working directory.
// For __dirname equivalent in ES modules:
const __dirname = path.resolve(); // This is correct for your setup as you're using path.resolve()

app.use(express.json({ limit: '10mb' })); // To parse JSON payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // To parse URL-encoded payloads
app.use(cookieParser()); // To parse cookies

// CORS configuration for your frontend
app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true // Allow cookies to be sent
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    // Serve the static files from the Frontend's dist directory
    app.use(express.static(path.join(__dirname, "Frontend", "dist")));

    // Catch-all route to serve index.html for any other requests
    // This is crucial for single-page applications (SPAs)
    app.get("*", (req, res) => { // Changed "/*" to "*"
        res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
    });
}

// Initialize Socket.IO with the HTTP server
initSocketServer(server); // Pass the server instance

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB(); // Connect to MongoDB when the server starts
});
