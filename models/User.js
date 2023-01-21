const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "please enter a valid email"]
    },

    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "minimum password length is 6 characters long"]
    }
});

// fire a function before doc saved to db
userSchema.pre("save", function(next) {
    console.log("this.....", this);
    const salt = bcrypt.genSalt();
    next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;