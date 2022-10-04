// importing the required modules
const { Object } = require("../models/objectSchema");
const { Utils } = require("../middlewares/utils");
const { Constant } = require("../middlewares/constant");
const { User } = require("../models/users");
const { Storage } = require("../middlewares/storage");
require("dotenv").config();
const Fs = require('fs');

// instantiating the middlewares
const utils = new Utils();
const constants = new Constant();
const storage = new Storage();

fileSize = async(path) => {  
    
    try{
        const stats = await Fs.statSync(path)
        // Convert the file size to megabytes (optional)
        const fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        return fileSizeInMegabytes
    }catch(error){
        console.log('An error occured')
    }   
}

const uploadFile = (req, res) => {
    const fileUpload = storage.upload.array('file', 5)
        fileUpload (req, res, async(err) => {
            const files = req.files;
            const { _id } = req.user;

            if (err) {
                // console.log(err)
                return res.status(500).json({
                    status: false,
                    message: "Unable to upload Files",
                    error: utils.getMessage("UNKNOWN_ERROR"),
                });
            }

            let createdFiles = [];
            for (i = 0; i < files.length; i++) {   
                
                let extension = files[i].originalname.split(".").pop(); 
                let filePath = process.env.Storage_URL + files[i].filename;
                let fileCategory = constants.getMessage(extension);

                const newFile = await new Object({
                    author: _id,
                    objectName: files[i].originalname,
                    objectUri: filePath,
                    // objectSize: fileSize(filePath),
                    category: fileCategory,
                }).save(); 

                // console.log('file info', files[i]);
                
                createdFiles.push(newFile);
            };

            return res.status(200).json({
                success: true,
                message: "file successfully uploaded",
                createdFiles
            }); 
        }
    );
    
};

const deleteFile = async (req, res) => {
    const { id } = req.user;
   

    try {
        const fileExists = await Object.findById({ _id: id });
        if (!fileExists) {
            return res.status(404).json({
                status: false,
                message: "file does not exist",
                error: utils.getMessage("FILE_EXISTENCE_ERROR"),
            });
         }

        const deleteFile = await Object.findOneAndDelete({ _id: id });
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
    const { id } = req.user;
    try {
        const fetchFiles = await Object.findById({ _id: id })
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
        // return res.status(500).json({
        //     status: false,
        //     message: "Unable to fetch Files",
        //     error: utils.getMessage("UNKNOWN_ERROR"),
        // });
    }
};


module.exports = {
    uploadFile,
    deleteFile,
    fetchAllFiles
};