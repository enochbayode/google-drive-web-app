const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
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
    },
    isActive: {
        type: Boolean,
        default: true,
    }

},{ timestamps: true });

const User = mongoose.model("users", userSchema);

module.exports = { User };