// routes/chat.js
import express from "express";
import { WebSocketServer } from 'ws';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
let wss = null;

export const initializeWebSocket = (server) => {
  wss = new WebSocketServer({ server });
  
  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');
    
    ws.on('message', async (data) => {
      try {
        const messageData = JSON.parse(data);
        const { threadId, content, sender } = messageData;

        // Save message to thread
        const thread = await ChatThread.findById(threadId);
        if (!thread) throw new Error('Thread not found');

        thread.messages.push({ sender, content });
        thread.lastMessageAt = new Date();
        await thread.save();

        // Broadcast to participants only
        wss.clients.forEach((client) => {
          if (client.userId && 
              thread.participants.includes(client.userId) && 
              client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              threadId,
              message: thread.messages[thread.messages.length - 1]
            }));
          }
        });
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
  });
};

// Create new chat thread
router.post("/thread", authMiddleware, async (req, res) => {
  try {
    const { recordId, participantId } = req.body;
    
    // Check if thread already exists
    const existingThread = await ChatThread.findOne({
      participants: { $all: [req.user._id, participantId] },
      recordId
    });

    if (existingThread) {
      return res.json(existingThread);
    }

    const thread = new ChatThread({
      participants: [req.user._id, participantId],
      recordId
    });

    await thread.save();
    res.status(201).json(thread);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all chat threads for current user
router.get("/threads", authMiddleware, async (req, res) => {
  try {
    const threads = await ChatThread.find({
      participants: req.user._id
    })
    .populate('participants', 'username')
    .populate('recordId', 'name')
    .sort('-lastMessageAt');
    
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a specific thread
router.get("/thread/:threadId", authMiddleware, async (req, res) => {
  try {
    const thread = await ChatThread.findById(req.params.threadId)
      .populate('participants', 'username')
      .populate('recordId', 'name');
    
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Check if user is participant
    if (!thread.participants.some(p => p._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: "Not authorized to view this thread" });
    }

    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;