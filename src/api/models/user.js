const mongoose = require("mongoose");

//Define the schema for users
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Export the user schema model with the name 'User'
module.exports = mongoose.model('User', userSchema);