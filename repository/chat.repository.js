import userModel from "../model/user.model.js";
import { messageModel } from "../model/message.model.js";
import match from "../model/match.model.js";

class ChatRepository {
  //create user may not need
  createUser = async (data) => {
    try {
      const newUser = new userModel(data);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  //get user by id may not need
  getUserById = async (id) => {
    try {
      const user = await userModel.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw error;
    }
  };

  //create match --- setting that both user can chat now;
  createMatch = async (data) => {
    try {
      console.log("TO BE SAVED: ",data);
      
      const matchForUser = new match(data);
      matchForUser.save();
      return matchForUser;
    } catch (error) {
      throw error;
    }
  };
  //update Match list
  updateMatch = async (data) => {
    try {
      const matchForUser = match.findOneAndUpdate(
        { userId: data.userId },
        { $addToSet: { users: data.user } },
        { new: true, upsert: true }
      );
      return matchForUser;
    } catch (error) {
      throw error;
    }
  };

  //get matcList
  getMatchListForUser = async (userId) => {
    try {
      const matches = await match
        .findOne({ userId })
        .populate("users", "name profileImage lastMessage updatedAt");
      return matches;
    } catch (error) {
      throw error;
    }
  };

  //get a user from math list
  getUserFromMatchList = async (userId, searchId) => {
    try {
      const matches = await match.findOne({ userId }).populate({
        path: "users",
        match: { _id: searchId },
        select: "name",
      });
      console.log(matches);
      return matches;
    } catch (error) {
      throw error;
    }
  };

  //create message
  createMessage = async (data) => {
    try {
      const newMessage = new messageModel(data);
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw error;
    }
  };

  //updatate message isRead status to true
  updateMessageIsReadStatus = async (messageId) => {
    try {
      await messageModel.findByIdAndUpdate(messageId, { isRead: true });
    } catch (error) {
      throw error;
    }
  };

  //update last message
  updateLastMessage = async (data) => {
    try {
      await userModel.findByIdAndUpdate(data.userId, {
        lastMessage: data.lastMessage,
      });
    } catch (error) {
      throw error;
    }
  };

  //get messages by id
  getMessagesByUserId = async (senderId,receiverId) => {
    try {
      console.log("Senders",senderId);
      console.log("Rece",receiverId);
      
      const messages = await messageModel.find({'senderId':senderId,'receiverId':receiverId}).sort({ createdAt: 1 });
      return messages;
    } catch (error) {
      throw error;
    }

  }
}
export default ChatRepository;
