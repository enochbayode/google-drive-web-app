// importing the required modules
const { Object } = require("../models/objectSchema");
const { Utils } = require("../middlewares/utils");
const { Storage } = require("../middlewares/storage");

// instantiating the middlewares
const utils = new Utils();
const storage = new Storage();

// const uploadObject = async (req, res) => {
    
// }

const uploadFile = (req, res) => {
    const { _id } = req.user;
    const {
        file_name,
        file_uri,
        file_size, 
    } = req.body;

    const newFile = new Object({
        user: _id,
        file_name,
        file_uri,
        file_size,
    });


    // const savedFile = await newFile.save();
    const fileUpload = storage.upload.array('file', 5);
    fileUpload(req, res, (err) => {
        const files = req.files;

        if (err) {
            // console.log(err);
            return res.status(400).json({
                status: false,
                message: "Unable to upload file",
                error: utils.getMessage("FILE_UPLOAD_ERROR"),
            });
        }

        let data = [];

        for (i = 0; i < files.length; i++) {
            data.push({
                fileName: files[i].originalname,
                path: files[i].path,      
            });
        }

        
        return res.status(200).json({
            success: true,
            message: "file successfully uploaded",
            data,
        });
    });
};    



module.exports = {
    uploadFile,
};