import ChatRepository from "../repository/chat.repository.js";

class ChatService {
  constructor() {
    this.chatRepository = new ChatRepository();
  }

  //create a user
  createUser = async (data) => {
    try {
      return await this.chatRepository.createUser(data);
    } catch (error) {}
  };

  //create match
  matchMannage = async (senderId, receiverId) => {
    try {
      const match = await this.getMatchList(senderId);
      if (match) {
        console.log("found match");
        //search a user
        const user = await this.chatRepository.getUserFromMatchList(
          senderId,
          receiverId
        );
        console.log("match", user);

        if (user.users.length == 0) {
          console.log("found match but receiver dos not exsists");
          const receiver = await this.chatRepository.getUserById(receiverId);
          const sender = await this.chatRepository.getUserById(senderId);
          const matchDataForSender = { userId: senderId, user: receiver };
          const matchDataForReceiver = { userId: receiverId, user: sender };
          await this.chatRepository.updateMatch(matchDataForSender);
          await this.chatRepository.updateMatch(matchDataForReceiver);

          return { message: "Match created successfully" };
        }
      } else {
        console.log("found no match creating data in match");
        const receiver = await this.chatRepository.getUserById(receiverId);
        const sender = await this.chatRepository.getUserById(senderId);
        const matchDataForSender = { userId: senderId, users: receiver };
        const matchDataForReceiver = { userId: receiverId, users: sender };
        await this.chatRepository.createMatch(matchDataForSender);
        await this.chatRepository.createMatch(matchDataForReceiver);
        return { message: "Match created successfully" };
      }
    } catch (error) {
      throw error;
    }
  };
  //get match list
  getMatchList = async (userId) => {
    try {
      return await this.chatRepository.getMatchListForUser(userId);
    } catch (error) {
      throw error;
    }
  };
  //sendMessage
  sendMessage = async (data) => {
    try {
      //update last message

      await this.chatRepository.updateLastMessage({
        userId: data.senderId,
        lastMessage: data.message,
      });
      console.log("udate sender side last message");

      await this.chatRepository.updateLastMessage({
        userId: data.receiverId,
        lastMessage: data.message,
      });
      console.log("update receiver side last message");

      data.messageId = `${data.senderId}-${data.receiverId}`;
      return await this.chatRepository.createMessage(data);

      //update last message
    } catch (error) {
      throw error;
    }
  };

  //get messages
  getMessages = async (senderId,receiverId) => {
    try {
      const messages = await this.chatRepository.getMessagesByUserId(senderId,receiverId);
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
export default ChatService;
