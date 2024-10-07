import mongoose from "mongoose";
const Schema = mongoose.Schema;
const matchSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }]

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
        },
    },

    timestamps: true,
});

const match = mongoose.model('Matches', matchSchema);
export default match;