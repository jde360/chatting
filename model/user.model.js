import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    lastMessage: {
      type: String,
      required: false,
      default: "Tap to start chat",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },

    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema);

export default userModel;
