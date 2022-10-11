// importing the required modules
const googleCloud = require('@google-cloud/storage');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const { v4: uuid } = require('uuid');
const path = require('path');
const { diskStorage } = require('multer');

class Storage {
    constructor() {
      //defining the list of accepted media files
      this.media = 
      [
        // images
        'jpeg', 'png', 'jpg',
        'gif', 'bmp', 'psd',
        'thm', 
        
        //  music
        'mpa',  'wav', 
        'mp3', 'm4a', 'm4v',
        'iff', 'mid', 'aif',
        'm3u', 'ra', 'wma',
          
        //  video
        'mov', 'mpg', 'rm',
        'avi', 'asx', 'srt',
        'swf', 'vob', 'wmv',
        'mp4', 'm4v', 'asf',
        'vob', 

        // docs
        'doc', 'docx', 'pdf',
        'xlr', 'xlsx', 'db',
        'dbf', 'msg', 'wps',
        'wpd', 'txt', 'pages',
        'odt', 'log', 'tex',
        'rtf', 
      ];
  
      // setting up google firebase storage
      this.storage = new googleCloud.Storage({
        projectId: process.env.Firebase_Project_ID, //'<Firebase Project ID'
        keyFilename: path.resolve(process.env.Private_Key_JSON), //'<path to service accounts prviate key JSON>'
      });
  
      this.bucket = this.storage.bucket(process.env.Image_Bucket);
  
      this.fileFilter = (req, file, cb) => {
        if (this.media.includes(file.mimetype.split('/')[1])) {
          cb(null, true);
          return;
        } else {
          cb(new Error('Invalid file'));
          // cb(null, false);
          return;
        }
      };
  
      //media files should not exceed 10 MB as 1MB is equivalent to 1048576B
      // i.e 1024 1024*
      this.fileSize = 10 * 1024 * 1024;
  
      this.upload = multer({
        //storing image as buffer in memory for use in firebase
        storage: multerGoogleStorage.storageEngine({
          keyFilename: path.resolve(process.env.Private_Key_JSON),
          projectId: process.env.Firebase_Project_ID,
          bucket: process.env.Image_Bucket,
          acl: 'publicread',
          filename: (req, file, cb) => {
            const filename = this.generateFilename(file);
            cb(null, filename);
          },
        }),
        limits: { fileSize: this.fileSize }, //image should not exceed 10 MB
        fileFilter: this.fileFilter,
      });

      // console.log(this.fileSize)
    }
  
    /**
     *
     * @param {*} file file object
     * @returns {string} generated filename
     */
    generateFilename(file) {
      let fields = file.originalname.split('.');
      let fileType = fields[fields.length - 1];
      let randName = Date.now();
      let newFileName = `${randName}.${fileType}`;
      return newFileName;
    }
  
    /**
     *
     * @param {*} files array of file objects
     * @returns {array} boolean array of whether the image was deleted from firestore
     */
    deleteImages(files) {
      if (files) {
        files.map(async (file) => {
          try {
            await this.bucket.file(file.filename).delete();
            return true;
          } catch (error) {
            return false;
          }
        });
      }
    }
  
    /**
     *
     * @param {*} file file object
     * @returns {boolean} boolean whether the image was deleted from firestore
     */
    async deleteImage(file) {
      if (file) {
        try {
          await this.bucket.file(file.filename).delete();
          return true;
        } catch (error) {
          return false;
        }
      }
    }
  
    /**
     *
     * @param {*} files array of file objects
     * @returns {array} boolean array of whether the image was deleted from local disk
     */
    deleteLocalImages(files) {
      if (files) {
        files.map(async (file) => {
          try {
            await fs.unlink(path.resolve(`uploads/${file.filename}`));
            return true;
          } catch (error) {
            // return false;
          }
        });
      }
    }
  
    /**
     *
     * @param {*} file file object
     * @returns {boolean} boolean whether the image was deleted from local disk
     */
    async deleteLocalImage(file) {
      if (file) {
        try {
          await fs.unlink(path.resolve(`uploads/${file.filename}`));
          return true;
        } catch (error) {
          return false;
        }
      }
    }
  }
  
  module.exports = { Storage };