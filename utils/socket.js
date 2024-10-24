import http from "http";
import { Server } from "socket.io";
import ChatService from "../service/chat.service.js";
import CallService from "../service/call.service.js";
import { callStatus } from "./call_status.js";
const startSocket = (app) => {
  const chatService = new ChatService();
  const callService = new CallService();

  const serverIo = http.createServer(app);
  const io = new Server(serverIo);
  io.on("connect", (socket) => {
    console.log("A user connected");

    // Listen for chat messages
    socket.on("newMessage", async (data) => {
      await chatService.sendMessage(data);

      io.emit("messages", async () => {
        const mesaages = await chatService.getMessages(
          data.senderId,
          data.receiverId
        );
        console.log(mesaages);
      }); // Broadcast the message to all users
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    //-------------------------- CALL FEATURES --------------------------
    socket.on(callStatus.INIT, async (data) => {
      try {
        const res = await callService.createCall(data);

        //send user in coming call notification

        //look for user if on a call or not
        const onCallRes = await callService.getOnCallStatus(data.to);

        if (onCallRes) {
          setTimeout(() => {
            io.emit(callStatus.ON_CALL, async () => {});
          }, 3000);
        }

        //change status to ring
        await callService.updateCallStatus({
          roomId: res._id,
          status: callStatus.RINGING,
        });
        setTimeout(async () => {
          console.log("emitting Ringing...");

          io.emit(callStatus.RINGING, async () => {});
        }, 3000);

        //change status to missed after 30S
        setTimeout(async () => {
          await callService.updateCallStatus({
            roomId: res._id,
            status: callStatus.MISSED,
          });
          console.log("emitting missed");

          io.emit(callStatus.MISSED, async () => {});
        }, 30000);
      } catch (error) {
        console.log(error);
      }
    });
  });
  serverIo.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};
export default startSocket;
