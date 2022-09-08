const mongoose = require("mongoose");

const objectSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileUri: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    fileSize: {
        type: Number,
        required: true   
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now,
    },

},{ timestamps: true });

const Object = mongoose.model("object", objectSchema);

module.exports = { Object };