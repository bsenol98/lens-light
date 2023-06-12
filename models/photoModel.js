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
    }
});

const Photo = mongoose.model("Photo", PhotoSchema);

export default Photo;