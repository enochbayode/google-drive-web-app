// importing the required modules
const { Object } = require("../models/objectSchema");
const { Utils } = require("../middlewares/utils");
const { Constant } = require("../middlewares/constant");
const { Storage } = require("../middlewares/storage");
const Fs = require('fs');

// instantiating the middlewares
const utils = new Utils();
const constants = new Constant();
const storage = new Storage();

fileSize = async(path) => {  
    
    try{
        const stats = await Fs.stat(path)
        return stats.size
    }catch(error){
        console.log('An error occured')
    }   
}

const uploadFile = async (req, res) => {
    const fileUpload = storage.upload.array('file', 5)
        fileUpload (req, res, (err) => {
            const files = req.files;
            const { _id } = req.user;

            if (err) {
                return res.status(500).json({
                    status: false,
                    message: "Unable to upload Files",
                    error: utils.getMessage("UNKNOWN_ERROR"),
                });
            }

            let createdFiles = [];
            for (i = 0; i < files.length; i++) {   
                // let ext = files[i].originalname.split(".").pop();   
                let extension = files[i].originalname.split(".").pop(); 
                const newFile =  new Object({
                    author: _id,
                    objectName: files[i].originalname,
                    objectUri: files[i].path,
                    objectSize: fileSize(files[i].path),
                    category: constants.getMessage(extension),
                });

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