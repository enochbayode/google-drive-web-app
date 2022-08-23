// importing the required modules
const { Object } = require("../models/objectSchema");
const { Utils } = require("../middlewares/utils");
const { Storage } = require("../middlewares/storage");

// instantiating the middlewares
const utils = new Utils();
const storage = new Storage();

const uploadObject = async (req, res) => {
    const { _id } = req.user;
    const {
        object_name,
        object_uri,
        object_size, 
    } = req.body;

    const newObject = new Object({
        user: _id,
        object_name,
        object_uri,
        object_size,

    });
}