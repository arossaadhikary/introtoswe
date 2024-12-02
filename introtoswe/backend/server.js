// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import records from "./routes/record.js";
import auth from "./routes/auth.js";
import chat from "./routes/chat.js"
import { createServer } from 'http';
import { authMiddleware } from "./middleware/authMiddleware.js"; // Import auth middleware if needed elsewhere
import { WebSocketServer } from 'ws';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// Create HTTP server
const server = createServer(app);

// Initialize WebSocket for chat widget
// Create WebSocket server
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (data) => {
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocketServer.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Configure CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define Routes
app.use("/record", records);
app.use("/auth", auth);
app.use("/chat", chat);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
