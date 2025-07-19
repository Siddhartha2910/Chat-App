import { Server } from "socket.io";
// import http from "http"; // <-- REMOVE THIS
// import express from "express"; // <-- REMOVE THIS

// const app = express(); // <-- REMOVE THIS
// const server = http.createServer(app); // <-- REMOVE THIS

let io; // Declare io globally but don't initialize here

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

// New function to initialize Socket.IO
export function initSocketServer(httpServer) { // Accepts the server instance
  io = new Server(httpServer, { // Initialize io with the provided server
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

export { io }; // Only export io now, not app or server