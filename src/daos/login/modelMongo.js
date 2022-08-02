import mongoose from "mongoose";

const module = mongoose.model('users', {
    username: String,
    password: String,
    name: String
})

export default module;