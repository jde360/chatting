import express from "express"
import {  getMatches,  getMessages, sendMessage } from "../controller/chat.controller.js"


    const router = express.Router();

    router.get('/',getMatches);
    router.get('/messages',getMessages);
    router.post('/',sendMessage)
    // router.post('/send',createMessage)
    export {router as AppRouter}