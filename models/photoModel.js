import mongoose from "mongoose";

const { Schema } = mongoose;

const PhotoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    uploadedDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    url: {
        type: String,
        require: true,
    }
});

const Photo = mongoose.model("Photo", PhotoSchema);

export default Photo;