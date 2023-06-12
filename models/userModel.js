import mongoose from "mongoose";
import passwordHash from 'password-hash';


const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    mail: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    pass: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

userSchema.pre("save", function (next) {
    const user = this;
    console.log(user.pass);
    user.pass = passwordHash.generate(user.pass);
    console.log("HASH =>", user.pass);//passwordHash.verify('password123', hashedPassword)
    next()
});
const User = mongoose.model("User", userSchema)

export default User