import { Server } from "socket.io";
import http from "http";
import express from "express";
import Messages from "../models/message.model.js";
import Users from "../models/userschema.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials:true,
  },
});

// Used to store online users with their socket IDs
const userSocketMap = {}; // {userId: socketId}

// Function to get the receiver's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket.io connection
io.on("connection", async(socket) => {
  console.log("A user is Connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("sendMessage", async (message) => {
  console.log("Message is Sent:", message);
    try{
      const User = await Users.findById(message.senderId);
      message.senderName= User.fullName;
      message.senderProfile =User.profilePic;
      const newMessage = await Messages.create(message);
      console.log("New message saved:", newMessage);
      io.emit("receiveMessage", newMessage); 
    }
    catch(error){
      console.error("Error while saving the message:", error.message);
      socket.emit("errorMessage", { error: "Failed to send the message" });
    }
  
  });
  


 socket.on("deleteMsg",async(id)=>{
  const mymsg = await Messages.findByIdAndDelete(id);
  const allmsg = await Messages.find({});
  io.emit("remainMessage",allmsg)
 })
  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user is disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
