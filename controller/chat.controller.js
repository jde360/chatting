import ChatService from "../service/chat.service.js";

const chatService = new ChatService();

export const createUser =async (req,res,next) =>{
    try {
        console.log("createUser");
    const newUser = await chatService.createUser(req.body)
    res.status(201).send(newUser)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
export const sendMessage =async (req,res,next) =>{
    try {
        console.log("CREATE MESSAGE");
    const message = await chatService.sendMessage(req.body)

    res.status(200).send(message)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

export const getMatches =async (req,res,next) =>{
    try {
        const matches = await chatService.getMatchList(req.body.userId)
        res.status(200).send(matches)
    } catch (error) {
     console.log(error);
     res.status(500).send("Server Error")
        
    }
}
export const matchMannage =async (req,res,next) =>{
    try {
        const matches = await chatService.matchMannage(req.body.senderId,req.body.reciverId)
        res.status(200).send(matches)
    } catch (error) {
     console.log(error);
     res.status(500).send("Server Error")
        
    }
}
export const getMessages =async (req,res,next) =>{
    try {
        const chats = await chatService.getMessages(req.body.senderId,req.body.receiverId)
        res.status(200).send(chats)
    } catch (error) {
     console.log(error);
     res.status(500).send("Server Error")
        
    }
}