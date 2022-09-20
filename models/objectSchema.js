const { optional } = require("joi");
const mongoose = require("mongoose");

const objectSchema = mongoose.Schema({
    objectName: {
        type: String,
        required: true,
    },
    objectUri: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    objectSize: {
        type: Number,
        // required: true   
    },
    category: {
        type: String,
        required: optional
    },
    // ObjectType: {
    //     type: File,
    //     required: optional,
    // },
    extension: {
        type: String,
        required: true,
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now,
    },

},{ timestamps: true });

const Object = mongoose.model("object", objectSchema);

module.exports = { Object };