const mongoose = require("mongoose");

const objectSchema = mongoose.Schema({
    file_name: {
        type: String,
        required: true,
    },
    file_uri: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    size: {
        type: String,
       
    },

},{ timestamps: true });

const Object = mongoose.model("object", objectSchema);

module.exports = { Object };