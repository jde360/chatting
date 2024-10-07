import http from "http";
import { Server } from "socket.io";
import ChatService from "../service/chat.service.js";
const startSocket = (app) => {
const chatService = new ChatService();

  const serverIo = http.createServer(app);
  const io = new Server(serverIo);
  io.on("connect", (socket) => {
    console.log("A user connected");

    // Listen for chat messages
    socket.on("newMessage",async (data) => {
      await chatService.sendMessage(data)

      io.emit("messages", async () => {
    const mesaages =  await chatService.getMessages(data.senderId,data.receiverId)
    console.log(mesaages);
    
      }); // Broadcast the message to all users
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  serverIo.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};
export default startSocket;
