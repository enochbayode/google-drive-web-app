const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    totalStorage: {
        type: Number,
    },
    totalStorageUsed: {
        type: Number,
       
    },
    totalStorageAvailable: {
        type: Number,
       
    },

});

const User = mongoose.model("users", userSchema);

module.exports = { User };