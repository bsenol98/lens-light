import mongoose from "mongoose";

const toObjectId = id => mongoose.Types.ObjectId(id);

export default {toObjectId}