import mongoose from "mongoose";
const callSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
    sdp: {
      type: String,
      required: true,
    },

    durations: {
      type: Number,
      required: true,
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

const CallModel = mongoose.model("Call", callSchema);
export default CallModel;
