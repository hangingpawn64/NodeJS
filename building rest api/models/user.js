const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    gender:{
        type: String
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;