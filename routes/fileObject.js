const express = require("express");
const fileObjectrouter = express.Router();
const fileRequest = require('../controllers/fileObject');
const { 
    validateFileObject 
} = require("../middlewares/object.validation");
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

fileObjectrouter.post(
    '/uploadFile', 
    auth.tokenRequired,
    validateFileObject,
    fileRequest.uploadFile
);

fileObjectrouter.get(
    '/getAllFiles', 
    auth.tokenRequired,
    fileRequest.fetchAllFiles
);

fileObjectrouter.delete(
    '/deleteFile', 
    auth.tokenRequired,
    fileRequest.deleteFile
);





module.exports = { fileObjectrouter };