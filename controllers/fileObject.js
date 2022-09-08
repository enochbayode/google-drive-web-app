// importing the required modules
const { Object } = require("../models/objectSchema");
const { Utils } = require("../middlewares/utils");
const { Storage } = require("../middlewares/storage");

// instantiating the middlewares
const utils = new Utils();
const storage = new Storage();

// const uploadObject = async (req, res) => {
    
// }

const uploadFile = async (req, res) => {

    const { _id } = req.user;
    // const {
    //     fileName,
    //     fileUri,
    //     fileSize, 
    // } = req.files;

    // const newFile = new Object({
    //     author: _id,
    //     fileName,
    //     fileUri,
    //     fileSize,
    // });


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

        // const { _id } = req.user;

        // let data = [];
        // data.push({
            
            //     author: _id,
            //     fileName: files[i].originalname,
            //     fileUri: files[i].path,  
               
            // });

        const newFile = new Object({});
        for (i = 0; i < files.length; i++) {
            
            Object({
                author: _id,
                fileName: files[i].originalname,
                fileUri: files[i].path,
                fileSize: files[i].size 
            }).save();
        }
        
        return res.status(200).json({
            success: true,
            message: "file successfully uploaded",
            newFile,
        });
    });
};    

const deleteFile = async (req, res) => {
    const { id } = req.files;
    const files = req.files;

    try {
        const fileExists = await files.findById({ _id: id });
        if (!fileExists) {
            return res.status(404).json({
                status: false,
                message: "file does not exist",
                error: utils.getMessage("FILE_EXISTENCE_ERROR"),
            });
        }

        const deleteFile = await files.findOneAndDelete({ _id: id });
        if (deleteFile) {
            return res.status(200).json({
                status: true,
                message: "File successfully deleted",
            });
        } else {
            return res.status(500).json({
                status: false,
                message: "Unable to delete file",
                error: utils.getMessage("UNKNOWN_ERROR"),
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Unable to delete file",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};

const fetchAllFiles = async (req, res) => {
    const files = req.files;
    const { _id } = req.user;
    try {
        const fetchFiles = await Object.findById({author: _id})
            .sort({
                datePosted: -1,
            });

        if (fetchFiles.length == 0) {
            return res.status(404).json({
                status: false,
                message: "You have no file to display",
                error: utils.getMessage("FILE_EXISTENCE_ERROR"),
            });
        }

        return res.status(200).json({
            status: true,
            message: "files fetched successfully",
            data: fetchFiles,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Unable to fetch Files",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};


module.exports = {
    uploadFile,
    deleteFile,
    fetchAllFiles
};