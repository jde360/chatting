import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
    messageId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        required: true
    }
    ,
    messageType: {
        type: String,
        required: true
    },

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v
        },
    },

    timestamps: true,
});

const messageModel =  mongoose.model("Message", messageSchema);
export {messageModel}