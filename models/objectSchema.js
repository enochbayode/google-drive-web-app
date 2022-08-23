const mongoose = require("mongoose");

const objectSchema = mongoose.Schema({
    object_name: {
        type: String,
        required: true,
    },
    object_uri: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    object_size: {
        type: String,
        required: true   
    },

},{ timestamps: true });

const Object = mongoose.model("object", objectSchema);

module.exports = { Object };