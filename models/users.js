const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    },
    
    totalStorage: {
        type: Number,
        default : 200 * 1024 * 1024,
    },
    totalStorageUsed: {
        type: Number,
        default: 0,
    },
    totalStorageAvailable: {
        type: Number,
        default: 200 * 1024 *1024, 
        // default storage space 200mb 
    },
    

},{ timestamps: true });

const User = mongoose.model("users", userSchema);

module.exports = { User };