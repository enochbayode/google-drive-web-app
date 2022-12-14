// importing the required modules
const { Object } = require("../models/objectSchema");
const { Utils } = require("../middlewares/utils");
const { Constant } = require("../middlewares/constant");
const { User } = require("../models/users");
const { Storage } = require("../middlewares/storage");
require("dotenv").config();

// instantiating the middlewares
const utils = new Utils();
const constants = new Constant();
const storage = new Storage();

const { filesize } = require("filesize");
// const totalStorage = 200;
// const totalStorageUsed += 
// const totalStorageAvailable


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
                // let fileSize = filesize(265318, {base: 2, standard: files[i].originalname});
                console.log('File size',fileSize)

                const newFile = await new Object({
                    author: _id,
                    objectName: files[i].originalname,
                    objectUri: filePath,
                    objectSize: fileSize,
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

const deleteObject = async (req, res) => {
    const { id } = req.user;
   
    try {
        const objectExists = await Object.findById({ _id: id });
        if (!objectExists) {
            return res.status(404).json({
                status: false,
                message: "file does not exist",
                error: utils.getMessage("FILE_EXISTENCE_ERROR"),
            });
         }

        const deleteObject = await Object.findOneAndDelete({ _id: id });
        if (deleteObject) {
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

const fetchAllObjects = async (req, res) => {
    const { email } = req.query;
    let filter = {};

    if (email) {
        filter.email = email;
    }

    try {
        const fetchObjects = await Object.find(filter)
            .sort({
                datePosted: -1,
            });

        if (fetchObjects.length == 0) {
            return res.status(404).json({
                status: false,
                message: "You have no file to display",
                error: utils.getMessage("FILE_EXISTENCE_ERROR"),
            });
        }

        return res.status(200).json({
            status: true,
            message: "files fetched successfully",
            data: fetchObjects,
        });
    } catch (err) {
        // console.log(err);
        return res.status(500).json({
            status: false,
            message: "Unable to fetch Files",
            error: utils.getMessage("UNKNOWN_ERROR"),
        });
    }
};


module.exports = {
    uploadFile,
    deleteObject,
    fetchAllObjects
};