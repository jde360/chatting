import http from "http";
import { Server } from "socket.io";
import ChatService from "../service/chat.service.js";
import CallService from "../service/call.service.js";
const startSocket = (app) => {
  const chatService = new ChatService();
  const callService = new CallService();

  const serverIo = http.createServer(app);
  const io = new Server(serverIo);
  io.on("connect", (socket) => {
    console.log("A user connected");

    // Listen for chat messages
    socket.on("newMessage", async (data) => {
      await chatService.sendMessage(data)

      io.emit("messages", async () => {
        const mesaages = await chatService.getMessages(data.senderId, data.receiverId)
        console.log(mesaages);

      }); // Broadcast the message to all users
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    //-------------------------- CALL FEATURES --------------------------    
    socket.on('RINGING', async (data) => {
      try {
        console.log("**********************");
        //send notification to that user
        //check if user is already on a call
        const user = await callService.getAllIncomingCalls(data.userId);
        if (user && user.callStatus === 'calling') {
          return;
        }

        //update user status
        
        console.log(data);
      } catch (error) {
        console.log(error);

      }

    });

  });
  serverIo.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};
export default startSocket;
